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
exports.BaseEmailRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const _core_constants_1 = require("../../../../../server-core/constants");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
class BaseEmailRequestDto {
}
exports.BaseEmailRequestDto = BaseEmailRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User email address",
        example: "user@example.com",
        maxLength: _core_constants_1.UserEntityConstant.EmailMaxLength
    }),
    (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: "email" } }),
    (0, _core_custom_validators_1.ValidateMaxLength)(_core_constants_1.UserEntityConstant.EmailMaxLength, { constraints: { field: "email" } }),
    (0, _core_custom_validators_1.ValidateEmail)({ constraints: { field: "email" } }),
    __metadata("design:type", String)
], BaseEmailRequestDto.prototype, "email", void 0);
//# sourceMappingURL=base-email-request.dto.js.map