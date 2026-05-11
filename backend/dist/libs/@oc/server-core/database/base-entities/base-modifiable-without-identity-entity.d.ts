import { BaseEntity } from "typeorm";
export declare class BaseModifiableEntityWithoutIdentity extends BaseEntity {
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
