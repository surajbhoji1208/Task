import { UserStatus, UserTypeEnum } from "../../enums";
import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
export declare class User extends BaseModifiableEntityWithoutIdentity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string | null;
    salt: string | null;
    phoneNumber: string | null;
    dateOfBirth: Date | null;
    userType: UserTypeEnum;
    status: UserStatus;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    updatePassword(newPassword: string): Promise<void>;
}
