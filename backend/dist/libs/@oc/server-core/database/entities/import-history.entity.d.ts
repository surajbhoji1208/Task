import { ImportStatusEnum } from "../../enums";
import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
export declare class ImportHistory extends BaseModifiableEntityWithoutIdentity {
    id: string;
    fileName: string;
    totalRecords: number;
    importedRecords: number;
    skippedRecords: number;
    failedRecords: number;
    status: ImportStatusEnum;
    errorMessage: string | null;
}
