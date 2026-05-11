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
exports.ListProductRequestDto = void 0;
const _business_core_dto_1 = require("../../../../dto");
const _core_custom_validators_1 = require("../../../../../server-core/custom-validators");
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
class ListProductRequestDto extends _business_core_dto_1.CommonSearchRequestDto {
}
exports.ListProductRequestDto = ListProductRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Filter by category name", example: "Electronics" }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "category", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], ListProductRequestDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Filter by minimum rating (1-5)", example: 4 }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateMinValue)(1, { constraints: { field: "minRating" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "minRating", type: _core_enums_1.FieldTypeEnum.NumberString } }),
    __metadata("design:type", Number)
], ListProductRequestDto.prototype, "minRating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Filter by minimum review count", example: 100 }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateMinValue)(0, { constraints: { field: "minReviewCount" } }),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "minReviewCount", type: _core_enums_1.FieldTypeEnum.NumberString } }),
    __metadata("design:type", Number)
], ListProductRequestDto.prototype, "minReviewCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Sort by field",
        example: "rating",
        enum: ["productName", "rating", "ratingCount", "discountedPrice", "actualPrice", "discountPercentage", "createdAt"]
    }),
    (0, _core_custom_validators_1.ValidateOptional)(),
    (0, _core_custom_validators_1.ValidateType)({ constraints: { field: "sortBy", type: _core_enums_1.FieldTypeEnum.String } }),
    __metadata("design:type", String)
], ListProductRequestDto.prototype, "sortBy", void 0);
//# sourceMappingURL=list-product.request.dto.js.map