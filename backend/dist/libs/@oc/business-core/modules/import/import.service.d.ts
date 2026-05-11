import { AppResponse, CommonSearchResponseDto } from "../../dto";
import { ImportHistory } from "../../../server-core/database";
import { DataSource, Repository } from "typeorm";
import { ImportHistoryResponseDto } from "./dto/response/import-history.response.dto";
export declare class ImportService {
    #private;
    private readonly importHistoryRepo;
    private readonly dataSource;
    constructor(importHistoryRepo: Repository<ImportHistory>, dataSource: DataSource);
    importProducts(file: Express.Multer.File): Promise<AppResponse<ImportHistoryResponseDto>>;
    getImportHistory(pageNumber?: number, pageSize?: number): Promise<AppResponse<CommonSearchResponseDto<ImportHistoryResponseDto>>>;
    private parseFile;
    private parseCsvBuffer;
    private parseXlsxBuffer;
    private validateHeaders;
    private processRows;
    private importReviews;
    private splitField;
    private toDecimal;
    private toInt;
}
