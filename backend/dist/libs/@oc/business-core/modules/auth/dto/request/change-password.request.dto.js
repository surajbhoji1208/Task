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
exports.ChangePasswordRequestDto = void 0;
const _core_constants_1 = require("../../../../../server-core/constants");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
class ChangePasswordRequestDto {
}
exports.ChangePasswordRequestDto = ChangePasswordRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current password",
        example: "oldpassword123"
    }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "oldPassword", type: _core_enums_1.FieldTypeEnum.String } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "oldPassword" } }),
    __metadata("design:type", String)
], ChangePasswordRequestDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "New password",
        example: "newpassword123"
    }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "newPassword", type: _core_enums_1.FieldTypeEnum.String } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "newPassword" } }),
    (0, _core_custom_validators_1.ValidateMinLength)(_core_constants_1.UserEntityConstant.PasswordMinLength, { constraints: { field: "newPassword" } }),
    __metadata("design:type", String)
], ChangePasswordRequestDto.prototype, "newPassword", void 0);
//# sourceMappingURL=change-password.request.dto.js.map