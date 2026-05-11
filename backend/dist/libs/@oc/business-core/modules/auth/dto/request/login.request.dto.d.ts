import { BaseEmailRequestDto } from "./base-email-request.dto";
export declare class LoginRequestDto extends BaseEmailRequestDto {
    password: string;
    rememberMe: boolean;
}
