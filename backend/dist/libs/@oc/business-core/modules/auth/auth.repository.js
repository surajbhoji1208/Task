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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const _core_enums_1 = require("../../../server-core/enums");
const otp_repository_1 = require("./otp.repository");
const reset_password_token_repository_1 = require("./reset-password-token.repository");
const token_repository_1 = require("./token.repository");
const typeorm_1 = require("typeorm");
let AuthRepository = class AuthRepository {
    constructor(otpRepository, resetPasswordTokenRepository, tokenRepository) {
        this.otpRepository = otpRepository;
        this.resetPasswordTokenRepository = resetPasswordTokenRepository;
        this.tokenRepository = tokenRepository;
    }
    createOtp(otpData) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.otpRepository.create(otpData);
            return this.otpRepository.save(otp);
        });
    }
    findLatestOtpByUserIdAndType(userId, otpType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpRepository.findOne({
                where: { userId, otpType, isUsed: false },
                order: { createdAt: _core_enums_1.SortDirection.DESC }
            });
        });
    }
    markOtpAsUsed(otpId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.otpRepository.update({ id: otpId }, { isUsed: true });
        });
    }
    getOtpExpireTime(userId, otpType) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = yield this.findLatestOtpByUserIdAndType(userId, otpType);
            return otp ? otp.expireAt : null;
        });
    }
    createResetPasswordToken(tokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.resetPasswordTokenRepository.create(tokenData);
            return this.resetPasswordTokenRepository.save(token);
        });
    }
    findResetPasswordToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resetPasswordTokenRepository.findOne({
                where: {
                    resetToken,
                    isUsed: false,
                    expireAt: (0, typeorm_1.MoreThan)(new Date())
                },
                relations: ["user"]
            });
        });
    }
    markResetTokenAsUsed(tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resetPasswordTokenRepository.update({ id: tokenId }, { isUsed: true });
        });
    }
    removeExpiredOtps(userId, otpType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.otpRepository.delete({
                userId,
                otpType,
                expireAt: (0, typeorm_1.MoreThan)(new Date())
            });
        });
    }
    storeLoginToken(accessToken_1, refreshToken_1, userId_1) {
        return __awaiter(this, arguments, void 0, function* (accessToken, refreshToken, userId, rememberMe = false) {
            const token = this.tokenRepository.create({
                accessToken,
                refreshToken,
                userId,
                rememberMe
            });
            yield this.tokenRepository.save(token);
        });
    }
    findTokenByAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenRepository.findOne({
                where: { accessToken },
                relations: ["user"]
            });
        });
    }
    findTokenByRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenRepository.findOne({
                where: { refreshToken },
                relations: ["user"]
            });
        });
    }
    removeUserTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokenRepository.delete({ userId });
        });
    }
    removeTokenByAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tokenRepository.delete({ accessToken });
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_repository_1.OtpRepository,
        reset_password_token_repository_1.ResetPasswordTokenRepository,
        token_repository_1.TokenRepository])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map