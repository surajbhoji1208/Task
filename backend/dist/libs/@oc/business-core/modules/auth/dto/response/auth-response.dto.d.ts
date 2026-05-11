import { UserTypeEnum } from "../../../../../server-core/enums";
import { User } from "../../../../../server-core/database";
declare class AuthUserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: UserTypeEnum | null;
    constructor(id: string, firstName: string, lastName: string, email: string, userType: UserTypeEnum | null);
}
export declare class AuthResponseDto {
    otpRequired: boolean;
    accessToken?: string;
    refreshToken?: string;
    user?: AuthUserResponseDto;
    constructor(user?: User & Record<string, any>, accessToken?: string, refreshToken?: string, otpRequired?: boolean);
}
export declare class OtpLeftTimeResponseDto {
    leftTime: number;
    constructor(leftTime: number);
}
export {};
