"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _ImportService_logger;
var ImportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const _business_core_dto_1 = require("../../dto");
const _core_constants_1 = require("../../../server-core/constants");
const _core_database_1 = require("../../../server-core/database");
const _core_enums_1 = require("../../../server-core/enums");
const _core_utilities_1 = require("../../../server-core/utilities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sync_1 = require("csv-parse/sync");
const XLSX = __importStar(require("xlsx"));
const typeorm_2 = require("typeorm");
const import_history_response_dto_1 = require("./dto/response/import-history.response.dto");
const REQUIRED_HEADERS = ["product_id", "product_name", "category"];
let ImportService = ImportService_1 = _a = class ImportService {
    constructor(importHistoryRepo, dataSource) {
        this.importHistoryRepo = importHistoryRepo;
        this.dataSource = dataSource;
        _ImportService_logger.set(this, new common_1.Logger(ImportService_1.name));
    }
    importProducts(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b;
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.importProducts.name);
            __classPrivateFieldGet(this, _ImportService_logger, "f").debug(`${logPrefix} : Starting import for file: ${file.originalname}`);
            const history = this.importHistoryRepo.create({
                fileName: file.originalname,
                status: _core_enums_1.ImportStatusEnum.PROCESSING,
                totalRecords: 0,
                importedRecords: 0,
                skippedRecords: 0,
                failedRecords: 0,
                errorMessage: null
            });
            yield this.importHistoryRepo.save(history);
            try {
                const rows = this.parseFile(file);
                if (rows.length === 0) {
                    throw new common_1.BadRequestException({ message: "ERR_IMPORT_NO_VALID_ROWS" });
                }
                this.validateHeaders(rows[0]);
                history.totalRecords = rows.length;
                const summary = yield this.processRows(rows);
                history.importedRecords = summary.imported;
                history.skippedRecords = summary.updated;
                history.failedRecords = summary.failed;
                history.status = _core_enums_1.ImportStatusEnum.COMPLETED;
                __classPrivateFieldGet(this, _ImportService_logger, "f").debug(`${logPrefix} : Import completed — inserted: ${summary.imported}, updated: ${summary.updated}, failed: ${summary.failed}`);
            }
            catch (error) {
                history.status = _core_enums_1.ImportStatusEnum.FAILED;
                history.errorMessage = ((_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "Unknown error").substring(0, 2000);
                __classPrivateFieldGet(this, _ImportService_logger, "f").error(`${logPrefix} : Import failed: ${error === null || error === void 0 ? void 0 : error.message}`);
                if (error instanceof common_1.BadRequestException) {
                    yield this.importHistoryRepo.save(history);
                    throw error;
                }
            }
            const saved = yield this.importHistoryRepo.save(history);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.AddSuccessAction, new import_history_response_dto_1.ImportHistoryResponseDto(saved), { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.IMPORT) });
        });
    }
    getImportHistory() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10) {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.getImportHistory.name);
            __classPrivateFieldGet(this, _ImportService_logger, "f").debug(`${logPrefix} : Fetching import history`);
            const [records, total] = yield this.importHistoryRepo.findAndCount({
                order: { createdAt: "DESC" },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize
            });
            const dtos = records.map((r) => new import_history_response_dto_1.ImportHistoryResponseDto(r));
            const response = new _business_core_dto_1.CommonSearchResponseDto(dtos, pageSize, pageNumber, total);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, response, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.IMPORT)
            });
        });
    }
    parseFile(file) {
        const ext = file.originalname.toLowerCase().split(".").pop();
        if (ext === "csv") {
            return this.parseCsvBuffer(file.buffer);
        }
        if (ext === "xlsx" || ext === "xls") {
            return this.parseXlsxBuffer(file.buffer);
        }
        throw new common_1.BadRequestException({ message: "ERR_UNSUPPORTED_FILE_FORMAT" });
    }
    parseCsvBuffer(buffer) {
        try {
            const records = (0, sync_1.parse)(buffer, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
            return records;
        }
        catch (_b) {
            throw new common_1.BadRequestException({ message: "ERR_IMPORT_PARSE_FAILED" });
        }
    }
    parseXlsxBuffer(buffer) {
        try {
            const workbook = XLSX.read(buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if (rawRows.length < 2)
                return [];
            const headers = rawRows[0].map((h) => String(h).trim());
            const dataRows = rawRows.slice(1);
            return dataRows
                .filter((row) => Array.isArray(row) && row.some((cell) => cell != null && cell !== ""))
                .map((row) => {
                const obj = {};
                headers.forEach((header, idx) => {
                    var _b;
                    obj[header] = (_b = row[idx]) !== null && _b !== void 0 ? _b : "";
                });
                return obj;
            });
        }
        catch (_b) {
            throw new common_1.BadRequestException({ message: "ERR_IMPORT_PARSE_FAILED" });
        }
    }
    validateHeaders(firstRow) {
        const keys = Object.keys(firstRow).map((k) => k.toLowerCase().trim());
        const missing = REQUIRED_HEADERS.filter((h) => !keys.includes(h));
        if (missing.length > 0) {
            throw new common_1.BadRequestException({ message: "ERR_IMPORT_MISSING_HEADERS" });
        }
    }
    processRows(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            let imported = 0;
            let updated = 0;
            let failed = 0;
            const categoryCache = new Map();
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                for (const row of rows) {
                    if (!row.product_id || !row.product_name) {
                        failed++;
                        continue;
                    }
                    const externalProductId = String(row.product_id).trim();
                    const productName = String(row.product_name).trim();
                    const categoryPath = String((_b = row.category) !== null && _b !== void 0 ? _b : "").trim();
                    const topLevelCategory = categoryPath.split("|")[0].trim();
                    let categoryId = null;
                    if (topLevelCategory) {
                        if (categoryCache.has(topLevelCategory)) {
                            categoryId = categoryCache.get(topLevelCategory);
                        }
                        else {
                            let category = yield queryRunner.manager.findOne(_core_database_1.Category, {
                                where: { name: topLevelCategory }
                            });
                            if (!category) {
                                category = queryRunner.manager.create(_core_database_1.Category, { name: topLevelCategory });
                                category = yield queryRunner.manager.save(_core_database_1.Category, category);
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
                    const aboutProduct = String((_c = row.about_product) !== null && _c !== void 0 ? _c : "").trim() || null;
                    let existingProduct = yield queryRunner.manager.findOne(_core_database_1.Product, {
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
                        yield queryRunner.manager.save(_core_database_1.Product, existingProduct);
                        updated++;
                    }
                    else {
                        const newProduct = queryRunner.manager.create(_core_database_1.Product, {
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
                        existingProduct = yield queryRunner.manager.save(_core_database_1.Product, newProduct);
                        imported++;
                    }
                    yield this.importReviews(queryRunner, existingProduct.id, row);
                }
                yield queryRunner.commitTransaction();
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
            return { imported, updated, failed };
        });
    }
    importReviews(queryRunner, productId, row) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d;
            const userNames = this.splitField(row.user_name);
            if (userNames.length === 0)
                return;
            const reviewTitles = this.splitField(row.review_title);
            const reviewContents = this.splitField(row.review_content);
            for (let i = 0; i < userNames.length; i++) {
                const userName = (_b = userNames[i]) !== null && _b !== void 0 ? _b : null;
                const reviewTitle = (_c = reviewTitles[i]) !== null && _c !== void 0 ? _c : null;
                const reviewContent = (_d = reviewContents[i]) !== null && _d !== void 0 ? _d : null;
                if (!userName && !reviewTitle)
                    continue;
                const existing = yield queryRunner.manager.findOne(_core_database_1.Review, {
                    where: { productId, userName, reviewTitle }
                });
                if (!existing) {
                    const review = queryRunner.manager.create(_core_database_1.Review, {
                        productId,
                        userName,
                        reviewTitle,
                        reviewContent
                    });
                    yield queryRunner.manager.save(_core_database_1.Review, review);
                }
            }
        });
    }
    splitField(value) {
        if (value == null || value === "")
            return [];
        return String(value)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }
    toDecimal(value) {
        if (value == null || value === "")
            return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    }
    toInt(value) {
        if (value == null || value === "")
            return null;
        const num = parseInt(String(value), 10);
        return isNaN(num) ? null : num;
    }
};
exports.ImportService = ImportService;
_ImportService_logger = new WeakMap();
exports.ImportService = ImportService = ImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(_core_database_1.ImportHistory)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ImportService);
//# sourceMappingURL=import.service.js.map