import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
export declare class AppMailerService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    VerifyEmailOtpSend(user: any, otp: any): Promise<void>;
    LoginOtpSend(user: any, otp: any): Promise<void>;
    forgotPasswordOtp(user: any, otp: any): Promise<void>;
    ResetPasswordLink(resetLink: any, user: any): Promise<void>;
    ResendPasswordLink(resetLink: any, user: any): Promise<void>;
    sendPendingFeeReminder(userPlanData: any): Promise<void>;
    sendUserOnboardingEmail(userData: any): Promise<void>;
    sendAbsenceJustificationEmail(absenceData: any): Promise<void>;
}
