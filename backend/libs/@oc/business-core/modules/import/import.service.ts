import { AppResponse, CommonSearchResponseDto } from "@business-core-dto";
import { SuccessConstant } from "@core-constants";
import { Category, ImportHistory, Product, Review } from "@core-database";
import { ImportStatusEnum, ModuleName } from "@core-enums";
import { GenerateLogPrefix, MapToModuleName } from "@core-utilities";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { parse as parseCsv } from "csv-parse/sync";
import * as XLSX from "xlsx";
import { DataSource, Repository } from "typeorm";
import { ImportHistoryResponseDto } from "./dto/response/import-history.response.dto";

interface ProductImportRow {
    product_id: string;
    product_name: string;
    category: string;
    discounted_price: string | number;
    actual_price: string | number;
    discount_percentage: string | number;
    rating: string | number;
    rating_count: string | number;
    about_product: string;
    user_name: string;
    review_title: string;
    review_content: string;
}

const REQUIRED_HEADERS = ["product_id", "product_name", "category"];

@Injectable()
export class ImportService {
    readonly #logger: Logger = new Logger(ImportService.name);

    constructor(
        @InjectRepository(ImportHistory)
        private readonly importHistoryRepo: Repository<ImportHistory>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async importProducts(
        file: Express.Multer.File
    ): Promise<AppResponse<ImportHistoryResponseDto>> {
        const logPrefix = GenerateLogPrefix(this.importProducts.name);
        this.#logger.debug(`${logPrefix} : Starting import for file: ${file.originalname}`);

        const history = this.importHistoryRepo.create({
            fileName: file.originalname,
            status: ImportStatusEnum.PROCESSING,
            totalRecords: 0,
            importedRecords: 0,
            skippedRecords: 0,
            failedRecords: 0,
            errorMessage: null
        });
        await this.importHistoryRepo.save(history);

        try {
            const rows = this.parseFile(file);

            if (rows.length === 0) {
                throw new BadRequestException({ message: "ERR_IMPORT_NO_VALID_ROWS" });
            }

            this.validateHeaders(rows[0]);

            history.totalRecords = rows.length;

            const summary = await this.processRows(rows);

            history.importedRecords = summary.imported;
            history.skippedRecords = summary.updated;
            history.failedRecords = summary.failed;
            history.status = ImportStatusEnum.COMPLETED;

            this.#logger.debug(
                `${logPrefix} : Import completed — inserted: ${summary.imported}, updated: ${summary.updated}, failed: ${summary.failed}`
            );
        } catch (error: any) {
            history.status = ImportStatusEnum.FAILED;
            history.errorMessage = (error?.message ?? "Unknown error").substring(0, 2000);
            this.#logger.error(`${logPrefix} : Import failed: ${error?.message}`);

            if (error instanceof BadRequestException) {
                await this.importHistoryRepo.save(history);
                throw error;
            }
        }

        const saved = await this.importHistoryRepo.save(history);

        return new AppResponse(
            SuccessConstant.AddSuccessAction,
            new ImportHistoryResponseDto(saved),
            { module: MapToModuleName(ModuleName.IMPORT) }
        );
    }

    async getImportHistory(
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<AppResponse<CommonSearchResponseDto<ImportHistoryResponseDto>>> {
        const logPrefix = GenerateLogPrefix(this.getImportHistory.name);
        this.#logger.debug(`${logPrefix} : Fetching import history`);

        const [records, total] = await this.importHistoryRepo.findAndCount({
            order: { createdAt: "DESC" },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize
        });

        const dtos = records.map((r) => new ImportHistoryResponseDto(r));
        const response = new CommonSearchResponseDto(dtos, pageSize, pageNumber, total);

        return new AppResponse(SuccessConstant.ListFetch, response, {
            module: MapToModuleName(ModuleName.IMPORT)
        });
    }

    private parseFile(file: Express.Multer.File): ProductImportRow[] {
        const ext = file.originalname.toLowerCase().split(".").pop();

        if (ext === "csv") {
            return this.parseCsvBuffer(file.buffer);
        }

        if (ext === "xlsx" || ext === "xls") {
            return this.parseXlsxBuffer(file.buffer);
        }

        throw new BadRequestException({ message: "ERR_UNSUPPORTED_FILE_FORMAT" });
    }

    private parseCsvBuffer(buffer: Buffer): ProductImportRow[] {
        try {
            const records = parseCsv(buffer, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
            return records as ProductImportRow[];
        } catch {
            throw new BadRequestException({ message: "ERR_IMPORT_PARSE_FAILED" });
        }
    }

    private parseXlsxBuffer(buffer: Buffer): ProductImportRow[] {
        try {
            const workbook = XLSX.read(buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawRows = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

            if (rawRows.length < 2) return [];

            const headers = (rawRows[0] as string[]).map((h) => String(h).trim());
            const dataRows = rawRows.slice(1);

            return dataRows
                .filter((row) => Array.isArray(row) && row.some((cell) => cell != null && cell !== ""))
                .map((row) => {
                    const obj: Record<string, any> = {};
                    headers.forEach((header, idx) => {
                        obj[header] = (row as any[])[idx] ?? "";
                    });
                    return obj as ProductImportRow;
                });
        } catch {
            throw new BadRequestException({ message: "ERR_IMPORT_PARSE_FAILED" });
        }
    }

    private validateHeaders(firstRow: ProductImportRow): void {
        const keys = Object.keys(firstRow).map((k) => k.toLowerCase().trim());
        const missing = REQUIRED_HEADERS.filter((h) => !keys.includes(h));
        if (missing.length > 0) {
            throw new BadRequestException({ message: "ERR_IMPORT_MISSING_HEADERS" });
        }
    }

    private async processRows(
        rows: ProductImportRow[]
    ): Promise<{ imported: number; updated: number; failed: number }> {
        let imported = 0;
        let updated = 0;
        let failed = 0;

        const categoryCache = new Map<string, string>();

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (const row of rows) {
                if (!row.product_id || !row.product_name) {
                    failed++;
                    continue;
                }

                const externalProductId = String(row.product_id).trim();
                const productName = String(row.product_name).trim();
                const categoryPath = String(row.category ?? "").trim();
                const topLevelCategory = categoryPath.split("|")[0].trim();

                let categoryId: string | null = null;

                if (topLevelCategory) {
                    if (categoryCache.has(topLevelCategory)) {
                        categoryId = categoryCache.get(topLevelCategory)!;
                    } else {
                        let category = await queryRunner.manager.findOne(Category, {
                            where: { name: topLevelCategory }
                        });

                        if (!category) {
                            category = queryRunner.manager.create(Category, { name: topLevelCategory });
                            category = await queryRunner.manager.save(Category, category);
                        }

                        categoryId = category.id;
                        categoryCache.set(topLevelCategory, category.id);
                    }
                }

                const discountedPrice = this.toDecimal(row.discounted_price);
                const actualPrice = this.toDecimal(row.actual_price);
                const discountPercentage = this.toDecimal(row.discount_percentage);
                const rating = this.toDecimal(row.rating);
                const ratingCount = this.toInt(row.rating_count);
                const aboutProduct = String(row.about_product ?? "").trim() || null;

                let existingProduct = await queryRunner.manager.findOne(Product, {
                    where: { externalProductId }
                });

                if (existingProduct) {
                    existingProduct.productName = productName;
                    existingProduct.categoryId = categoryId;
                    existingProduct.categoryPath = categoryPath || null;
                    existingProduct.discountedPrice = discountedPrice;
                    existingProduct.actualPrice = actualPrice;
                    existingProduct.discountPercentage = discountPercentage;
                    existingProduct.rating = rating;
                    existingProduct.ratingCount = ratingCount;
                    existingProduct.aboutProduct = aboutProduct;
                    await queryRunner.manager.save(Product, existingProduct);
                    updated++;
                } else {
                    const newProduct = queryRunner.manager.create(Product, {
                        externalProductId,
                        productName,
                        categoryId,
                        categoryPath: categoryPath || null,
                        discountedPrice,
                        actualPrice,
                        discountPercentage,
                        rating,
                        ratingCount,
                        aboutProduct
                    });
                    existingProduct = await queryRunner.manager.save(Product, newProduct);
                    imported++;
                }

                await this.importReviews(queryRunner, existingProduct.id, row);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        return { imported, updated, failed };
    }

    private async importReviews(
        queryRunner: any,
        productId: string,
        row: ProductImportRow
    ): Promise<void> {
        const userNames = this.splitField(row.user_name);
        if (userNames.length === 0) return;

        const reviewTitles = this.splitField(row.review_title);
        const reviewContents = this.splitField(row.review_content);

        for (let i = 0; i < userNames.length; i++) {
            const userName = userNames[i] ?? null;
            const reviewTitle = reviewTitles[i] ?? null;
            const reviewContent = reviewContents[i] ?? null;

            if (!userName && !reviewTitle) continue;

            const existing = await queryRunner.manager.findOne(Review, {
                where: { productId, userName, reviewTitle }
            });

            if (!existing) {
                const review = queryRunner.manager.create(Review, {
                    productId,
                    userName,
                    reviewTitle,
                    reviewContent
                });
                await queryRunner.manager.save(Review, review);
            }
        }
    }

    private splitField(value: string | number | undefined | null): string[] {
        if (value == null || value === "") return [];
        return String(value)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    private toDecimal(value: string | number | undefined | null): number | null {
        if (value == null || value === "") return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }

    private toInt(value: string | number | undefined | null): number | null {
        if (value == null || value === "") return null;
        const num = parseInt(String(value), 10);
        return isNaN(num) ? null : num;
    }
}
