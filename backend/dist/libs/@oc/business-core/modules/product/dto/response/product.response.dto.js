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
exports.ProductResponseDto = exports.ReviewSummaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReviewSummaryDto {
    constructor(review) {
        this.id = review.id;
        this.userName = review.userName;
        this.reviewTitle = review.reviewTitle;
        this.reviewContent = review.reviewContent;
    }
}
exports.ReviewSummaryDto = ReviewSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Review unique identifier" }),
    __metadata("design:type", String)
], ReviewSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Reviewer username", nullable: true }),
    __metadata("design:type", String)
], ReviewSummaryDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Review title", nullable: true }),
    __metadata("design:type", String)
], ReviewSummaryDto.prototype, "reviewTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Review content", nullable: true }),
    __metadata("design:type", String)
], ReviewSummaryDto.prototype, "reviewContent", void 0);
class ProductResponseDto {
    constructor(product) {
        var _a, _b, _c;
        this.id = product.id;
        this.externalProductId = product.externalProductId;
        this.productName = product.productName;
        this.categoryId = product.categoryId;
        this.categoryPath = product.categoryPath;
        this.categoryName = (_c = (_b = (_a = product.category) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : product.categoryName) !== null && _c !== void 0 ? _c : null;
        this.discountedPrice = product.discountedPrice != null ? Number(product.discountedPrice) : null;
        this.actualPrice = product.actualPrice != null ? Number(product.actualPrice) : null;
        this.discountPercentage = product.discountPercentage != null ? Number(product.discountPercentage) : null;
        this.rating = product.rating != null ? Number(product.rating) : null;
        this.ratingCount = product.ratingCount;
        this.aboutProduct = product.aboutProduct;
        this.reviews = Array.isArray(product.reviews)
            ? product.reviews.map((r) => new ReviewSummaryDto(r))
            : [];
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}
exports.ProductResponseDto = ProductResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product unique identifier" }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "External product ID from source dataset", example: "B07JW9H4J1" }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "externalProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name" }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category UUID", nullable: true }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Full category hierarchy path", nullable: true }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "categoryPath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Top-level category name", nullable: true }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Discounted price", nullable: true }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "discountedPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Original price before discount", nullable: true }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "actualPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Discount percentage (0–1 decimal)", nullable: true }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Average product rating", nullable: true }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of ratings", nullable: true }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "ratingCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product description / features", nullable: true }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "aboutProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product reviews", type: [ReviewSummaryDto] }),
    __metadata("design:type", Array)
], ProductResponseDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Record creation timestamp" }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Record last update timestamp" }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=product.response.dto.js.map