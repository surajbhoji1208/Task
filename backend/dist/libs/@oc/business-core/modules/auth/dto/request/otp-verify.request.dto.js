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
exports.OtpVerifyRequestDto = void 0;
const _core_constants_1 = require("../../../../../server-core/constants");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const swagger_1 = require("@nestjs/swagger");
const _core_enums_1 = require("../../../../../server-core/enums");
class OtpVerifyRequestDto {
}
exports.OtpVerifyRequestDto = OtpVerifyRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User email address",
        example: "user@example.com"
    }),
    (0, _core_custom_validators_1.ValidateEmail)({ constraints: { field: "email" } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "email" } }),
    __metadata("design:type", String)
], OtpVerifyRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `${_core_constants_1.OtpEntityConstant.OtpLength}-digit OTP code`,
        example: "123456"
    }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "otp", type: _core_enums_1.FieldTypeEnum.String } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "otp" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.OtpEntityConstant.OtpLength, { constraints: { field: "otp" } }),
    __metadata("design:type", String)
], OtpVerifyRequestDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "OTP type",
        enum: _core_enums_1.OtpType,
        example: _core_enums_1.OtpType.LOGIN
    }),
    (0, _core_custom_validators_1.ValidateEnumType)(_core_enums_1.OtpType, { constraints: { field: "otpType" } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "otpType" } }),
    __metadata("design:type", Number)
], OtpVerifyRequestDto.prototype, "otpType", void 0);
//# sourceMappingURL=otp-verify.request.dto.js.map