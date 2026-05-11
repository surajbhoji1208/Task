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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpLeftTimeResponseDto = exports.AuthResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const _core_enums_1 = require("../../../../../server-core/enums");
class AuthUserResponseDto {
    constructor(id, firstName, lastName, email, userType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userType = userType;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's unique identifier",
        example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    __metadata("design:type", String)
], AuthUserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's first name",
        example: "John"
    }),
    __metadata("design:type", String)
], AuthUserResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's last name",
        example: "Doe"
    }),
    __metadata("design:type", String)
], AuthUserResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's email address",
        example: "user@example.com"
    }),
    __metadata("design:type", String)
], AuthUserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's type",
        example: _core_enums_1.UserTypeEnum.SUPER_ADMIN,
        enum: _core_enums_1.UserTypeEnum,
        nullable: true
    }),
    __metadata("design:type", Number)
], AuthUserResponseDto.prototype, "userType", void 0);
class AuthResponseDto {
    constructor(user, accessToken, refreshToken, otpRequired) {
        this.otpRequired = otpRequired || false;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        if (user) {
            this.user = new AuthUserResponseDto(user.id, user.firstName, user.lastName, user.email, user.userType);
        }
    }
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if OTP verification is required",
        example: false
    }),
    __metadata("design:type", Boolean)
], AuthResponseDto.prototype, "otpRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "JWT access token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        required: false
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "JWT refresh token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        required: false
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User information",
        type: AuthUserResponseDto,
        required: false
    }),
    __metadata("design:type", AuthUserResponseDto)
], AuthResponseDto.prototype, "user", void 0);
class OtpLeftTimeResponseDto {
    constructor(leftTime) {
        this.leftTime = leftTime;
    }
}
exports.OtpLeftTimeResponseDto = OtpLeftTimeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Remaining time in seconds",
        example: 300
    }),
    __metadata("design:type", Number)
], OtpLeftTimeResponseDto.prototype, "leftTime", void 0);
//# sourceMappingURL=auth-response.dto.js.map