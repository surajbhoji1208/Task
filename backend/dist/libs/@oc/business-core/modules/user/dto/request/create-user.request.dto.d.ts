import { UserTypeEnum, UserStatus } from "../../../../../server-core/enums";
export declare class CreateUserRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    dateOfBirth: string;
    age: string;
    userType?: UserTypeEnum;
    status?: UserStatus;
}
