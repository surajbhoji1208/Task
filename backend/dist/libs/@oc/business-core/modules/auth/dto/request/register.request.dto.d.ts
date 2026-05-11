import { UserTypeEnum } from "../../../../../server-core/enums";
export declare class RegisterRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    dateOfBirth: string;
    age: string;
    userType?: UserTypeEnum;
}
