import { ImportStatusEnum } from "@core-enums";
import { ApiProperty } from "@nestjs/swagger";

export class ImportHistoryResponseDto {
    constructor(history: any) {
        this.id = history.id;
        this.fileName = history.fileName;
        this.totalRecords = history.totalRecords;
        this.importedRecords = history.importedRecords;
        this.skippedRecords = history.skippedRecords;
        this.failedRecords = history.failedRecords;
        this.status = history.status;
        this.errorMessage = history.errorMessage;
        this.createdAt = history.createdAt;
        this.updatedAt = history.updatedAt;
    }

    @ApiProperty({ description: "Import history unique identifier" })
    id: string;

    @ApiProperty({ description: "Uploaded file name" })
    fileName: string;

    @ApiProperty({ description: "Total records parsed from the file" })
    totalRecords: number;

    @ApiProperty({ description: "Records successfully imported" })
    importedRecords: number;

    @ApiProperty({ description: "Records skipped (already exist, updated)" })
    skippedRecords: number;

    @ApiProperty({ description: "Records that failed to import due to validation errors" })
    failedRecords: number;

    @ApiProperty({ description: "Import status", enum: ImportStatusEnum })
    status: ImportStatusEnum;

    @ApiProperty({ description: "Error message if import failed", nullable: true })
    errorMessage: string | null;

    @ApiProperty({ description: "Import started at" })
    createdAt: Date;

    @ApiProperty({ description: "Import completed at" })
    updatedAt: Date;
}
