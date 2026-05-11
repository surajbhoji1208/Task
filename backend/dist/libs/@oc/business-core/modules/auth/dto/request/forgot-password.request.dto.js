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
exports.ForgotPasswordRequestDto = void 0;
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
class ForgotPasswordRequestDto {
}
exports.ForgotPasswordRequestDto = ForgotPasswordRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User email address",
        example: "user@example.com"
    }),
    (0, _core_custom_validators_1.ValidateEmail)({ constraints: { field: "email" } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "email" } }),
    __metadata("design:type", String)
], ForgotPasswordRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Platform (front/admin)",
        example: "front"
    }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "platform", type: _core_enums_1.FieldTypeEnum.String } }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "platform" } }),
    __metadata("design:type", String)
], ForgotPasswordRequestDto.prototype, "platform", void 0);
//# sourceMappingURL=forgot-password.request.dto.js.map