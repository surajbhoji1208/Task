import { UserTypeEnum, UserStatus } from "../../../../../server-core/enums";
export declare class UserResponseDto {
    constructor(user: any);
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    dateOfBirth: string | null;
    userType: UserTypeEnum;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
