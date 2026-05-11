import { Identity } from "./identity";
export declare class BaseModifiableEntity extends Identity {
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
