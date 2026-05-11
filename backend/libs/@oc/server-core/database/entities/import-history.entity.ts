import { ImportHistoryEntityConstant } from "@core-constants";
import { ImportStatusEnum } from "@core-enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";

@Entity("import_history")
export class ImportHistory extends BaseModifiableEntityWithoutIdentity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: ImportHistoryEntityConstant.FileNameMaxLength,
        name: "file_name",
        nullable: false
    })
    fileName: string;

    @Column({ type: "integer", name: "total_records", nullable: false, default: 0 })
    totalRecords: number;

    @Column({ type: "integer", name: "imported_records", nullable: false, default: 0 })
    importedRecords: number;

    @Column({ type: "integer", name: "skipped_records", nullable: false, default: 0 })
    skippedRecords: number;

    @Column({ type: "integer", name: "failed_records", nullable: false, default: 0 })
    failedRecords: number;

    @Column({
        type: "enum",
        enum: ImportStatusEnum,
        name: "status",
        nullable: false,
        default: ImportStatusEnum.PROCESSING
    })
    status: ImportStatusEnum;

    @Column({
        type: "varchar",
        length: ImportHistoryEntityConstant.ErrorMessageMaxLength,
        name: "error_message",
        nullable: true
    })
    errorMessage: string | null;
}
