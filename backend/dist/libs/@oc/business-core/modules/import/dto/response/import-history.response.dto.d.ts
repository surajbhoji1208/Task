import { ImportStatusEnum } from "../../../../../server-core/enums";
export declare class ImportHistoryResponseDto {
    constructor(history: any);
    id: string;
    fileName: string;
    totalRecords: number;
    importedRecords: number;
    skippedRecords: number;
    failedRecords: number;
    status: ImportStatusEnum;
    errorMessage: string | null;
    createdAt: Date;
    updatedAt: Date;
}
