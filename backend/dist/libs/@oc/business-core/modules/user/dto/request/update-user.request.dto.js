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
exports.UpdateUserRequestDto = void 0;
const _core_constants_1 = require("../../../../../server-core/constants");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserRequestDto {
}
exports.UpdateUserRequestDto = UpdateUserRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's first name",
        example: "John",
        minLength: 1,
        maxLength: _core_constants_1.UserEntityConstant.FirstNameMaxLength
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateMinLength)(1, { constraints: { field: "first name" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.FirstNameMaxLength, { constraints: { field: "first name" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "first name", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's last name",
        example: "Doe",
        minLength: 1,
        maxLength: _core_constants_1.UserEntityConstant.LastNameMaxLength
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateMinLength)(1, { constraints: { field: "last name" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.LastNameMaxLength, { constraints: { field: "last name" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "last name", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's email address",
        example: "john.doe@example.com",
        maxLength: _core_constants_1.UserEntityConstant.EmailMaxLength
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.EmailMaxLength, { constraints: { field: "email" } }),
    (0, _core_custom_validators_1.ValidateEmail)({ constraints: { field: "email" } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's phone number",
        example: "+1234567890",
        maxLength: _core_constants_1.UserEntityConstant.PhoneNumberMaxLength
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.PhoneNumberMaxLength, { constraints: { field: "phone number" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "phone number", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's date of birth",
        example: "1990-01-01",
        type: "string",
        format: "date"
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "date of birth", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's age",
        example: 30,
        minimum: 0,
        maximum: 150
    }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "age", type: _core_enums_1.FieldTypeEnum.NumberString } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "User's status",
        example: _core_enums_1.UserStatus.ACTIVE,
        enum: _core_enums_1.UserStatus
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateEnumType)(_core_enums_1.UserStatus, { constraints: { field: "status" } }),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "status", void 0);
//# sourceMappingURL=update-user.request.dto.js.map