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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _AuthService_logger;
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const _business_core_dto_1 = require("../../dto");
const _core_enums_1 = require("../../../server-core/enums");
const _core_shared_modules_1 = require("../../../server-core/shared-modules");
const _core_utilities_1 = require("../../../server-core/utilities");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const auth_repository_1 = require("./auth.repository");
const _core_constants_1 = require("../../../server-core/constants");
const auth_response_dto_1 = require("./dto/response/auth-response.dto");
let AuthService = AuthService_1 = _a = class AuthService {
    constructor(userService, authRepository, appJwtService, configService, appMailerService) {
        this.userService = userService;
        this.authRepository = authRepository;
        this.appJwtService = appJwtService;
        this.configService = configService;
        this.appMailerService = appMailerService;
        _AuthService_logger.set(this, new common_1.Logger(AuthService_1.name));
    }
    loginUser(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.loginUser.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Authenticating user with email: ${loginDto.email}`);
            const user = yield this.userService.findUserByEmail(loginDto.email);
            if (!user) {
                throw new common_1.UnauthorizedException({ message: "ERR_EMAIL_NOT_FOUND" });
            }
            const isPasswordValid = yield user.validatePassword(loginDto.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException({ message: "ERR_INVALID_CREDENTIALS" });
            }
            if (user.status !== _core_enums_1.UserStatus.ACTIVE) {
                throw new common_1.NotAcceptableException({ message: "ERR_ACCOUNT_INACTIVE" });
            }
            const otpEnabled = this.configService.get("app.otp.enabled", false);
            if (otpEnabled) {
                const otpCode = _core_utilities_1.GenerateOtpNumber.generateOtp();
                const expireTime = new Date();
                expireTime.setMinutes(expireTime.getMinutes() + this.configService.get("app.otp.expire_time", 10));
                yield this.authRepository.createOtp({
                    otpCode,
                    otpType: _core_enums_1.OtpType.LOGIN,
                    expireAt: expireTime,
                    userId: user.id,
                    isUsed: false
                });
                yield this.appMailerService.LoginOtpSend(user, otpCode);
                const response = {
                    otpRequired: true
                };
                __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : OTP verification required for user: ${user.id}`);
                return new _business_core_dto_1.AppResponse("OTP verification required. Please check your email for the verification code.", response);
            }
            else {
                const tokens = yield this.appJwtService.generateJWTToken(user, loginDto.rememberMe);
                yield this.authRepository.storeLoginToken(tokens.accessToken, tokens.refreshToken, user.id);
                const response = new auth_response_dto_1.AuthResponseDto(user, tokens.accessToken, tokens.refreshToken, false);
                __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : User authenticated successfully: ${user.id}`);
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, response, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH),
                    action: "loggedin"
                });
            }
        });
    }
    register(registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.register.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Registering new user with email: ${registerDto.email}`);
            const existingUser = yield this.userService.findUserByEmail(registerDto.email, registerDto.userType);
            if (existingUser) {
                throw new common_1.BadRequestException({ message: "ERR_EMAIL_EXISTS" });
            }
            const ageNumber = registerDto.age ? parseInt(registerDto.age) : null;
            const userEntity = {
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                email: registerDto.email,
                password: registerDto.password,
                phoneNumber: registerDto.phoneNumber,
                dateOfBirth: new Date(registerDto.dateOfBirth),
                age: ageNumber,
                userType: registerDto.userType || _core_enums_1.UserTypeEnum.USER,
                status: _core_enums_1.UserStatus.PENDING_VERIFICATION
            };
            const savedUser = yield this.userService.saveUser(userEntity);
            const otpCode = _core_utilities_1.GenerateOtpNumber.generateOtp();
            const expireTime = new Date();
            expireTime.setMinutes(expireTime.getMinutes() + this.configService.get("app.otp.expire_time", 10));
            yield this.authRepository.createOtp({
                otpCode,
                otpType: _core_enums_1.OtpType.REGISTER,
                expireAt: expireTime,
                userId: savedUser.id,
                isUsed: false
            });
            yield this.appMailerService.LoginOtpSend(savedUser, otpCode);
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : User registered successfully. OTP sent to: ${registerDto.email}`);
            return new _business_core_dto_1.AppResponse("Registration successful. Please check your email for the verification code.", {}, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH), action: "registered" });
        });
    }
    otpVerify(otpVerifyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.otpVerify.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Verifying OTP for email: ${otpVerifyDto.email}`);
            const user = yield this.userService.findUserByEmail(otpVerifyDto.email);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_EMAIL_NOT_FOUND" });
            }
            const otp = yield this.authRepository.findLatestOtpByUserIdAndType(user.id, otpVerifyDto.otpType);
            if (!otp) {
                throw new common_1.NotFoundException({ message: "ERR_OTP_NOT_FOUND" });
            }
            if (otp.otpCode !== otpVerifyDto.otp) {
                throw new common_1.NotFoundException({ message: "ERR_OTP_INVALID" });
            }
            if (otp.expireAt <= new Date()) {
                throw new common_1.NotFoundException({ message: "ERR_OTP_EXPIRED" });
            }
            yield this.authRepository.markOtpAsUsed(otp.id);
            if (otpVerifyDto.otpType === _core_enums_1.OtpType.REGISTER) {
                if (user.status === _core_enums_1.UserStatus.PENDING_VERIFICATION) {
                    yield this.userService.updateUserStatus(user.id, _core_enums_1.UserStatus.ACTIVE);
                }
                const tokens = yield this.appJwtService.generateJWTToken(user);
                yield this.authRepository.storeLoginToken(tokens.accessToken, tokens.refreshToken, user.id);
                const response = new auth_response_dto_1.AuthResponseDto(user, tokens.accessToken, tokens.refreshToken, false);
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, response, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH),
                    action: "completed"
                });
            }
            else if (otpVerifyDto.otpType === _core_enums_1.OtpType.LOGIN) {
                const tokens = yield this.appJwtService.generateJWTToken(user);
                yield this.authRepository.storeLoginToken(tokens.accessToken, tokens.refreshToken, user.id);
                const response = new auth_response_dto_1.AuthResponseDto(user, tokens.accessToken, tokens.refreshToken, false);
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, response, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH),
                    action: "verified"
                });
            }
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, {}, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH),
                action: "verified"
            });
        });
    }
    getOtpLeftTime(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.getOtpLeftTime.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Getting OTP left time for email: ${data.email}`);
            const user = yield this.userService.findUserByEmail(data.email);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_MODULE_NOT_FOUND", module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
            }
            const expireTime = yield this.authRepository.getOtpExpireTime(user.id, data.otpType);
            if (!expireTime) {
                throw new common_1.NotAcceptableException({ message: "ERR_OTP_NOT_FOUND" });
            }
            const now = new Date();
            const remainingTime = Math.max(0, Math.floor((expireTime.getTime() - now.getTime()) / 1000));
            const response = new auth_response_dto_1.OtpLeftTimeResponseDto(remainingTime);
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : OTP expires in ${remainingTime} seconds`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, response, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH),
                action: "received"
            });
        });
    }
    resendOtp(resendOtpDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.resendOtp.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Resending OTP for email: ${resendOtpDto.email}`);
            const user = yield this.userService.findUserByEmail(resendOtpDto.email);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_EMAIL_NOT_FOUND" });
            }
            const otpCode = _core_utilities_1.GenerateOtpNumber.generateOtp();
            const expireTime = new Date();
            expireTime.setMinutes(expireTime.getMinutes() + this.configService.get("app.otp.expire_time", 10));
            yield this.authRepository.createOtp({
                otpCode,
                otpType: resendOtpDto.otpType,
                expireAt: expireTime,
                userId: user.id,
                isUsed: false
            });
            this.appMailerService.forgotPasswordOtp(user, otpCode);
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : OTP resent successfully for user: ${user.id}`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, {}, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH), action: "resent" });
        });
    }
    changePassword(changePasswordDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.changePassword.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Changing password for user: ${user.id}`);
            const userEntity = yield this.userService.findUserById(user.id);
            if (!userEntity) {
                throw new common_1.NotFoundException({ message: "ERR_USER_NOT_FOUND" });
            }
            const isOldPasswordValid = yield userEntity.validatePassword(changePasswordDto.oldPassword);
            if (!isOldPasswordValid) {
                throw new common_1.NotAcceptableException({ message: "ERR_CURRENT_PASSWORD_INCORRECT" });
            }
            yield this.userService.updateUserPassword(user.id, changePasswordDto.newPassword);
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Password changed successfully for user: ${user.id}`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, {}, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH), action: "changed" });
        });
    }
    forgotPassword(forgotPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.forgotPassword.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Initiating password reset for email: ${forgotPasswordDto.email}`);
            const user = yield this.userService.findUserByEmail(forgotPasswordDto.email);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_EMAIL_NOT_FOUND" });
            }
            if (user.status !== _core_enums_1.UserStatus.ACTIVE) {
                throw new common_1.NotAcceptableException({ message: "ERR_ACCOUNT_INACTIVE" });
            }
            const otpCode = _core_utilities_1.GenerateOtpNumber.generateOtp();
            const expireTime = new Date();
            expireTime.setMinutes(expireTime.getMinutes() + this.configService.get("app.otp.expire_time", 10));
            yield this.authRepository.createOtp({
                otpCode,
                otpType: _core_enums_1.OtpType.FORGOT_PASSWORD,
                expireAt: expireTime,
                userId: user.id,
                isUsed: false
            });
            this.appMailerService.forgotPasswordOtp(user, otpCode);
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Password reset initiated successfully for user: ${user.id}`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, {}, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH), action: "sent" });
        });
    }
    resetPassword(resetPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = this.resetPassword.name;
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Resetting password for user: ${resetPasswordDto.email}`);
            const user = yield this.userService.findUserByEmail(resetPasswordDto.email);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_EMAIL_NOT_FOUND" });
            }
            if (user.status !== _core_enums_1.UserStatus.ACTIVE) {
                throw new common_1.NotAcceptableException({ message: "ERR_ACCOUNT_INACTIVE" });
            }
            yield this.userService.updateUserPassword(user.id, resetPasswordDto.newPassword);
            __classPrivateFieldGet(this, _AuthService_logger, "f").debug(`${logPrefix} : Password reset completed successfully for user: ${user.id}`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, {}, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH), action: "reset" });
        });
    }
};
exports.AuthService = AuthService;
_AuthService_logger = new WeakMap();
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_repository_1.AuthRepository,
        _core_shared_modules_1.AppJwtService,
        config_1.ConfigService,
        _core_shared_modules_1.AppMailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map