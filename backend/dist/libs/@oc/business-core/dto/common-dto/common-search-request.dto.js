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
exports.CommonSearchRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const _core_custom_validators_1 = require("../../../server-core/custom-validators");
const _core_enums_1 = require("../../../server-core/enums");
class CommonSearchRequestDto {
    constructor() {
        this.pageSize = 10;
        this.pageNumber = 1;
        this.sortDirection = _core_enums_1.SortDirection.DESC;
    }
}
exports.CommonSearchRequestDto = CommonSearchRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "search text",
        example: ""
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommonSearchRequestDto.prototype, "searchText", void 0);
__decorate([
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "pageSize", type: _core_enums_1.FieldTypeEnum.NumberString } }),
    (0, swagger_1.ApiProperty)({
        description: "page size",
        example: "10"
    }),
    __metadata("design:type", Number)
], CommonSearchRequestDto.prototype, "pageSize", void 0);
__decorate([
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "pageNumber", type: _core_enums_1.FieldTypeEnum.NumberString } }),
    (0, swagger_1.ApiProperty)({
        description: "page number",
        example: "1"
    }),
    __metadata("design:type", Number)
], CommonSearchRequestDto.prototype, "pageNumber", void 0);
__decorate([
    (0, _core_custom_validators_1.ValidateEnumType)(_core_enums_1.SortDirection, { constraints: { field: "sortDirection" } }),
    (0, swagger_1.ApiProperty)({
        description: "sort direction",
        example: "DESC"
    }),
    __metadata("design:type", String)
], CommonSearchRequestDto.prototype, "sortDirection", void 0);
//# sourceMappingURL=common-search-request.dto.js.map