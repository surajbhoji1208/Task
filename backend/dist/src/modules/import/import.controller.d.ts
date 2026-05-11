import { AppResponse, CommonSearchResponseDto } from "../../../libs/@oc/business-core/dto";
import { ImportHistoryResponseDto, ImportService } from "../../../libs/@oc/business-core/modules";
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
    importProducts(file: Express.Multer.File): Promise<AppResponse<ImportHistoryResponseDto>>;
    getHistory(pageNumber?: number, pageSize?: number): Promise<AppResponse<CommonSearchResponseDto<ImportHistoryResponseDto>>>;
}
