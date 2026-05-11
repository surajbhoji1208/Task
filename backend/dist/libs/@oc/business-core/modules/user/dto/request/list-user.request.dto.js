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
exports.ListUserRequestDto = void 0;
const _business_core_dto_1 = require("../../../../dto");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
class ListUserRequestDto extends _business_core_dto_1.CommonSearchRequestDto {
}
exports.ListUserRequestDto = ListUserRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by user type",
        example: _core_enums_1.UserTypeEnum.USER,
        enum: _core_enums_1.UserTypeEnum
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateEnumType)(_core_enums_1.UserTypeEnum, { constraints: { field: "user type" } }),
    __metadata("design:type", Number)
], ListUserRequestDto.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by user status",
        example: _core_enums_1.UserStatus.ACTIVE,
        enum: _core_enums_1.UserStatus
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateEnumType)(_core_enums_1.UserStatus, { constraints: { field: "status" } }),
    __metadata("design:type", String)
], ListUserRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Sort by field",
        example: "createdAt",
        enum: ["firstName", "lastName", "name", "email", "age", "createdAt", "updatedAt"]
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "sort by", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], ListUserRequestDto.prototype, "sortBy", void 0);
//# sourceMappingURL=list-user.request.dto.js.map