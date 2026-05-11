import { BaseModifiableEntity } from "../base-entities/base-modifiable-entity";
import { User } from "./user.entity";
export declare class ResetPasswordToken extends BaseModifiableEntity {
    resetToken: string;
    userId: string;
    expireAt: Date;
    isUsed: boolean;
    platform: string;
    user: User;
}
