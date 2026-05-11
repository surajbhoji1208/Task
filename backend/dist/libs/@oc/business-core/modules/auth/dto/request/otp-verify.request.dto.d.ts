import { OtpType } from "../../../../../server-core/enums";
export declare class OtpVerifyRequestDto {
    email: string;
    otp: string;
    otpType: OtpType;
}
