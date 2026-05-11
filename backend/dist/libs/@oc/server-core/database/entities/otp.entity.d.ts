import { OtpType } from "../../enums";
import { BaseModifiableEntity } from "../base-entities/base-modifiable-entity";
import { User } from "./user.entity";
export declare class Otp extends BaseModifiableEntity {
    otpCode: string;
    otpType: OtpType;
    expireAt: Date;
    isUsed: boolean;
    userId: string;
    user: User;
}
