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
exports.RegisterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const _core_constants_1 = require("../../../../../server-core/constants");
class RegisterRequestDto {
}
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's first name",
        example: "John",
        minLength: 1,
        maxLength: _core_constants_1.UserEntityConstant.FirstNameMaxLength
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "First name" } }),
    (0, _core_custom_validators_1.ValidateMinLength)(1, { constraints: { field: "First name" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.FirstNameMaxLength, { constraints: { field: "First name" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "firstName", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's last name",
        example: "Doe",
        minLength: 1,
        maxLength: _core_constants_1.UserEntityConstant.LastNameMaxLength
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "Last name" } }),
    (0, _core_custom_validators_1.ValidateMinLength)(1, { constraints: { field: "Last name" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.LastNameMaxLength, { constraints: { field: "Last name" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "lastName", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's email address",
        example: "john.doe@example.com",
        maxLength: _core_constants_1.UserEntityConstant.EmailMaxLength
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "Email" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.EmailMaxLength, { constraints: { field: "Email" } }),
    (0, _core_custom_validators_1.ValidateEmail)({ constraints: { field: "Email" } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's password",
        example: "password123",
        minLength: 8,
        maxLength: _core_constants_1.UserEntityConstant.PasswordMaxLength
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "Password" } }),
    (0, _core_custom_validators_1.ValidateMinLength)(8, { constraints: { field: "Password" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.PasswordMaxLength, { constraints: { field: "Password" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "password", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's phone number",
        example: "+1234567890",
        maxLength: _core_constants_1.UserEntityConstant.PhoneNumberMaxLength
    }),
    (0, _core_custom_validators_1.ValidateOptional)({ constraints: { field: "Phone number" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.PhoneNumberMaxLength, { constraints: { field: "Phone number" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "phoneNumber", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's date of birth",
        example: "1990-01-01",
        type: "string",
        format: "date"
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "Date of birth" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "dateOfBirth", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's age",
        example: 30
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "Age" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "age", type: _core_enums_1.FieldTypeEnum.NumberString } }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's type",
        example: _core_enums_1.UserTypeEnum.USER,
        enum: _core_enums_1.UserTypeEnum,
        default: _core_enums_1.UserTypeEnum.USER
    }),
    (0, _core_custom_validators_1.ValidateOptional)({ constraints: { field: "User type" } }),
    (0, _core_custom_validators_1.ValidateEnumType)(_core_enums_1.UserTypeEnum, { constraints: { field: "User type" } }),
    __metadata("design:type", Number)
], RegisterRequestDto.prototype, "userType", void 0);
//# sourceMappingURL=register.request.dto.js.map