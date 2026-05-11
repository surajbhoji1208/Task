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
exports.ReviewEngagementDto = exports.CategoryAvgRatingDto = exports.DiscountBucketDto = exports.TopReviewedProductDto = exports.ProductsPerCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductsPerCategoryDto {
    constructor(data) {
        this.categoryName = data.category_name;
        this.productCount = Number(data.product_count);
    }
}
exports.ProductsPerCategoryDto = ProductsPerCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category name" }),
    __metadata("design:type", String)
], ProductsPerCategoryDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of products in this category" }),
    __metadata("design:type", Number)
], ProductsPerCategoryDto.prototype, "productCount", void 0);
class TopReviewedProductDto {
    constructor(data) {
        var _a;
        this.id = data.product_id;
        this.externalProductId = data.product_external_product_id;
        this.productName = data.product_product_name;
        this.categoryName = (_a = data.category_name) !== null && _a !== void 0 ? _a : null;
        this.rating = data.product_rating != null ? Number(data.product_rating) : null;
        this.ratingCount = data.product_rating_count != null ? Number(data.product_rating_count) : null;
        this.discountedPrice = data.product_discounted_price != null ? Number(data.product_discounted_price) : null;
    }
}
exports.TopReviewedProductDto = TopReviewedProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product UUID" }),
    __metadata("design:type", String)
], TopReviewedProductDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "External product ID" }),
    __metadata("design:type", String)
], TopReviewedProductDto.prototype, "externalProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name" }),
    __metadata("design:type", String)
], TopReviewedProductDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Top-level category name", nullable: true }),
    __metadata("design:type", String)
], TopReviewedProductDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Average rating", nullable: true }),
    __metadata("design:type", Number)
], TopReviewedProductDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total rating / review count", nullable: true }),
    __metadata("design:type", Number)
], TopReviewedProductDto.prototype, "ratingCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Discounted price", nullable: true }),
    __metadata("design:type", Number)
], TopReviewedProductDto.prototype, "discountedPrice", void 0);
class DiscountBucketDto {
    constructor(data) {
        this.discountRange = data.discount_range;
        this.productCount = Number(data.product_count);
        this.avgRating = data.avg_rating != null ? Number(Number(data.avg_rating).toFixed(2)) : null;
    }
}
exports.DiscountBucketDto = DiscountBucketDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Discount percentage range label", example: "50%-75%" }),
    __metadata("design:type", String)
], DiscountBucketDto.prototype, "discountRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of products in this discount range" }),
    __metadata("design:type", Number)
], DiscountBucketDto.prototype, "productCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Average rating for products in this range", nullable: true }),
    __metadata("design:type", Number)
], DiscountBucketDto.prototype, "avgRating", void 0);
class CategoryAvgRatingDto {
    constructor(data) {
        this.categoryName = data.category_name;
        this.avgRating = data.avg_rating != null ? Number(Number(data.avg_rating).toFixed(2)) : null;
        this.productCount = Number(data.product_count);
        this.totalRatings = data.total_ratings != null ? Number(data.total_ratings) : null;
    }
}
exports.CategoryAvgRatingDto = CategoryAvgRatingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category name" }),
    __metadata("design:type", String)
], CategoryAvgRatingDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Average rating across products in this category", nullable: true }),
    __metadata("design:type", Number)
], CategoryAvgRatingDto.prototype, "avgRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of products in this category" }),
    __metadata("design:type", Number)
], CategoryAvgRatingDto.prototype, "productCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of all rating counts in this category", nullable: true }),
    __metadata("design:type", Number)
], CategoryAvgRatingDto.prototype, "totalRatings", void 0);
class ReviewEngagementDto {
    constructor(data) {
        this.totalProducts = Number(data.total_products);
        this.totalReviews = Number(data.total_reviews);
        this.avgReviewsPerProduct = data.avg_reviews_per_product != null
            ? Number(Number(data.avg_reviews_per_product).toFixed(2))
            : null;
        this.totalRatings = data.total_ratings != null ? Number(data.total_ratings) : null;
        this.avgRating = data.avg_rating != null ? Number(Number(data.avg_rating).toFixed(2)) : null;
        this.maxRatingCount = data.max_rating_count != null ? Number(data.max_rating_count) : null;
        this.minRatingCount = data.min_rating_count != null ? Number(data.min_rating_count) : null;
    }
}
exports.ReviewEngagementDto = ReviewEngagementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of products" }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "totalProducts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of review records" }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Average reviews per product", nullable: true }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "avgReviewsPerProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of all product rating counts", nullable: true }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "totalRatings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Overall average rating across all products", nullable: true }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "avgRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Maximum rating count for a single product", nullable: true }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "maxRatingCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Minimum rating count for a single product", nullable: true }),
    __metadata("design:type", Number)
], ReviewEngagementDto.prototype, "minRatingCount", void 0);
//# sourceMappingURL=analytics.response.dto.js.map