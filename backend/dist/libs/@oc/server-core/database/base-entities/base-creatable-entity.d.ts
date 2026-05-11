import { Identity } from "./identity";
export declare class BaseCreatableEntity extends Identity {
    createdBy: string;
    createdAt: Date;
}
