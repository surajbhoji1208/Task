"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMailerService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppMailerService = class AppMailerService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    VerifyEmailOtpSend(user, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mailerService.sendMail({
                template: "./verify-email",
                context: {
                    otp: otp
                },
                subject: `OTP - Email verification`,
                to: user.email
            });
        });
    }
    LoginOtpSend(user, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mailerService.sendMail({
                template: "./login-otp",
                context: {
                    otp: otp
                },
                subject: `OTP - Login verification`,
                to: user.email
            });
        });
    }
    forgotPasswordOtp(user, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const validity_minutes = this.configService.get("OTP_EXPIRE_TIME");
            const support_email = this.configService.get("email.support_email");
            const academy_name = this.configService.get("email.academy_name");
            const academy_website = this.configService.get("email.academy_website");
            const context = {
                user_name: `${user.firstName} ${user.lastName}`,
                otp_code: otp,
                otp_validity_minutes: validity_minutes,
                support_email: support_email,
                academy_name: academy_name,
                academy_website: academy_website
            };
            yield this.mailerService.sendMail({
                template: "./forgot-password",
                context: context,
                subject: `Your One-Time Password (OTP)`,
                to: user.email
            });
        });
    }
    ResetPasswordLink(resetLink, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mailerService.sendMail({
                template: "./reset-password-link",
                context: {
                    resetLink: resetLink
                },
                subject: `Reset Forgot Password Link`,
                to: user.email
            });
        });
    }
    ResendPasswordLink(resetLink, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mailerService.sendMail({
                template: "./reset-password-link",
                context: {
                    resetLink: resetLink
                },
                subject: `Resend Forgot Password Link`,
                to: user.email
            });
        });
    }
    sendPendingFeeReminder(userPlanData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const academy_name = this.configService.get("email.academy_name");
            const contact_number = this.configService.get("email.contact_number");
            const context = {
                recipient_name: `${userPlanData.user.firstName} ${userPlanData.user.lastName}`,
                month_or_package: ((_a = userPlanData.plan) === null || _a === void 0 ? void 0 : _a.name) || "Package",
                due_date: userPlanData.endDate ? new Date(userPlanData.endDate).toLocaleDateString() : "N/A",
                amount: userPlanData.customAmount || "N/A",
                sender_name: "Academy Admin",
                sender_role: "Academy Admin",
                academy_name: academy_name,
                contact_number: contact_number
            };
            yield this.mailerService.sendMail({
                template: "./pending-fee-reminder",
                context: context,
                subject: `Gentle Reminder – Pending Fee Payment`,
                to: userPlanData.user.email
            });
        });
    }
    sendUserOnboardingEmail(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = {
                userName: `${userData.firstName} ${userData.lastName}`,
                startDate: userData.startDate
                    ? new Date(userData.startDate).toLocaleDateString()
                    : new Date().toLocaleDateString(),
                senderName: "Admin"
            };
            yield this.mailerService.sendMail({
                template: "./user-onboarding",
                context: context,
                subject: `Welcome to Our Platform`,
                to: userData.email
            });
        });
    }
    sendAbsenceJustificationEmail(absenceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = {
                studentName: absenceData.studentName,
                absenceDays: absenceData.absenceDays,
                academyOwnerName: absenceData.academyOwnerName,
                parentName: absenceData.parentName,
                studentId: absenceData.studentId,
                batchName: absenceData.batchName,
                timeSlot: absenceData.timeSlot,
                coachName: absenceData.coachName,
                startDate: absenceData.startDate,
                endDate: absenceData.endDate,
                absenceReason: absenceData.absenceReason,
                senderName: absenceData.senderName,
                senderRole: absenceData.senderRole
            };
            yield this.mailerService.sendMail({
                template: "./absence-justification",
                context: context,
                subject: `Absence Justification – ${absenceData.studentName} (${absenceData.absenceDays} Days)`,
                to: absenceData.parentEmail,
                cc: absenceData.adminEmail
            });
        });
    }
};
exports.AppMailerService = AppMailerService;
exports.AppMailerService = AppMailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], AppMailerService);
//# sourceMappingURL=app-mailer.service.js.map