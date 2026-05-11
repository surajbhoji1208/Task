import { Otp, ResetPasswordToken, Token } from "../../../server-core/database";
import { OtpType } from "../../../server-core/enums";
import { OtpRepository } from "./otp.repository";
import { ResetPasswordTokenRepository } from "./reset-password-token.repository";
import { TokenRepository } from "./token.repository";
export declare class AuthRepository {
    private readonly otpRepository;
    private readonly resetPasswordTokenRepository;
    private readonly tokenRepository;
    constructor(otpRepository: OtpRepository, resetPasswordTokenRepository: ResetPasswordTokenRepository, tokenRepository: TokenRepository);
    createOtp(otpData: Partial<Otp>): Promise<Otp>;
    findLatestOtpByUserIdAndType(userId: string, otpType: OtpType): Promise<Otp | null>;
    markOtpAsUsed(otpId: string): Promise<void>;
    getOtpExpireTime(userId: string, otpType: OtpType): Promise<Date | null>;
    createResetPasswordToken(tokenData: Partial<ResetPasswordToken>): Promise<ResetPasswordToken>;
    findResetPasswordToken(resetToken: string): Promise<ResetPasswordToken | null>;
    markResetTokenAsUsed(tokenId: string): Promise<void>;
    removeExpiredOtps(userId: string, otpType: OtpType): Promise<void>;
    storeLoginToken(accessToken: string, refreshToken: string, userId: string, rememberMe?: boolean): Promise<void>;
    findTokenByAccessToken(accessToken: string): Promise<Token | null>;
    findTokenByRefreshToken(refreshToken: string): Promise<Token | null>;
    removeUserTokens(userId: string): Promise<void>;
    removeTokenByAccessToken(accessToken: string): Promise<void>;
}
