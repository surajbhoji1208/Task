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
exports.LoginRequestDto = void 0;
const _core_constants_1 = require("../../../../../server-core/constants");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
const base_email_request_dto_1 = require("./base-email-request.dto");
class LoginRequestDto extends base_email_request_dto_1.BaseEmailRequestDto {
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User password",
        example: "password123",
        minLength: _core_constants_1.UserEntityConstant.PasswordMinLength,
        maxLength: _core_constants_1.UserEntityConstant.PasswordMaxLength
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "password" } }),
    (0, _core_custom_validators_1.ValidateMinLength)(_core_constants_1.UserEntityConstant.PasswordMinLength, { constraints: { field: "password" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.PasswordMaxLength, { constraints: { field: "password" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "password", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "remember_me is required",
        example: false
    }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "rememberMe", type: _core_enums_1.FieldTypeEnum.Boolean } }),
    __metadata("design:type", Boolean)
], LoginRequestDto.prototype, "rememberMe", void 0);
//# sourceMappingURL=login.request.dto.js.map