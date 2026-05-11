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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _business_core_dto_1 = require("../../../libs/@oc/business-core/dto");
const _core_constants_1 = require("../../../libs/@oc/server-core/constants");
const _core_custom_decorators_1 = require("../../../libs/@oc/server-core/custom-decorators");
const _core_custom_guards_1 = require("../../../libs/@oc/server-core/custom-guards");
const _core_database_1 = require("../../../libs/@oc/server-core/database");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const _core_utilities_1 = require("../../../libs/@oc/server-core/utilities");
const _core_enums_1 = require("../../../libs/@oc/server-core/enums");
const AUTH_MODULE_NAME = (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.AUTH);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto) {
        return this.authService.loginUser(loginDto);
    }
    register(registerDto) {
        return this.authService.register(registerDto);
    }
    otpVerify(otpVerifyDto) {
        return this.authService.otpVerify(otpVerifyDto);
    }
    getOtpLeftTime(data) {
        return this.authService.getOtpLeftTime(data);
    }
    resendOtp(resendOtpDto) {
        return this.authService.resendOtp(resendOtpDto);
    }
    changePassword(changePasswordDto, user) {
        return this.authService.changePassword(changePasswordDto, user);
    }
    forgotPassword(forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    getProfile(user) {
        const responseDto = new _business_core_modules_1.UserResponseDto(user);
        return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.SuccessAction, responseDto, {
            module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER),
            action: "retrieved"
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("User login with email and password", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.UNAUTHORIZED], AUTH_MODULE_NAME, _business_core_modules_1.AuthResponseDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Register a new user account", [common_1.HttpStatus.CREATED, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.CONFLICT], AUTH_MODULE_NAME),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.RegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("otp-verify"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Verify OTP for login or registration", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.NOT_FOUND], AUTH_MODULE_NAME, _business_core_modules_1.AuthResponseDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.OtpVerifyRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "otpVerify", null);
__decorate([
    (0, common_1.Post)("otp-left-time"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Get remaining time before OTP expires", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.NOT_FOUND], AUTH_MODULE_NAME, _business_core_modules_1.OtpLeftTimeResponseDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.OtpLeftTimeRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getOtpLeftTime", null);
__decorate([
    (0, common_1.Post)("resend-otp"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Resend OTP to user email", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.NOT_FOUND], AUTH_MODULE_NAME),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.ResendOtpRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Put)("change-password"),
    (0, common_1.UseGuards)(_core_custom_guards_1.JwtAuthGuard),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Change user password with old password verification", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.UNAUTHORIZED, common_1.HttpStatus.NOT_ACCEPTABLE], AUTH_MODULE_NAME),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, _core_custom_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.ChangePasswordRequestDto, _core_database_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Initiate password reset process", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.NOT_FOUND, common_1.HttpStatus.NOT_ACCEPTABLE], AUTH_MODULE_NAME),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.ForgotPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("reset-password"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Reset password using valid reset token", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.UNAUTHORIZED, common_1.HttpStatus.NOT_FOUND], AUTH_MODULE_NAME),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.ResetPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, common_1.UseGuards)(_core_custom_guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Get current user profile", [common_1.HttpStatus.OK, common_1.HttpStatus.UNAUTHORIZED, common_1.HttpStatus.NOT_FOUND], AUTH_MODULE_NAME, _business_core_modules_1.UserResponseDto),
    __param(0, (0, _core_custom_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_core_database_1.User]),
    __metadata("design:returntype", _business_core_dto_1.AppResponse)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [_business_core_modules_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map