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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRepository = void 0;
const _core_database_1 = require("../../../server-core/database");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AnalyticsRepository = class AnalyticsRepository {
    constructor(productRepo, reviewRepo) {
        this.productRepo = productRepo;
        this.reviewRepo = reviewRepo;
    }
    getProductsPerCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo
                .createQueryBuilder("product")
                .select("category.name", "category_name")
                .addSelect("COUNT(product.id)", "product_count")
                .innerJoin("product.category", "category")
                .groupBy("category.id")
                .addGroupBy("category.name")
                .orderBy("product_count", "DESC")
                .getRawMany();
        });
    }
    getTopReviewedProducts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo
                .createQueryBuilder("product")
                .select([
                "product.id",
                "product.externalProductId",
                "product.productName",
                "product.rating",
                "product.ratingCount",
                "product.discountedPrice"
            ])
                .leftJoin("product.category", "category")
                .addSelect("category.name")
                .where("product.ratingCount IS NOT NULL")
                .orderBy("product.ratingCount", "DESC")
                .addOrderBy("product.rating", "DESC")
                .limit(limit)
                .getRawMany();
        });
    }
    getDiscountDistribution() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo
                .createQueryBuilder("product")
                .select(`CASE
                    WHEN product.discount_percentage < 0.25 THEN '0%-25%'
                    WHEN product.discount_percentage < 0.50 THEN '25%-50%'
                    WHEN product.discount_percentage < 0.75 THEN '50%-75%'
                    ELSE '75%-100%'
                END`, "discount_range")
                .addSelect("COUNT(product.id)", "product_count")
                .addSelect("AVG(product.rating)", "avg_rating")
                .where("product.discountPercentage IS NOT NULL")
                .groupBy(`CASE
                    WHEN product.discount_percentage < 0.25 THEN '0%-25%'
                    WHEN product.discount_percentage < 0.50 THEN '25%-50%'
                    WHEN product.discount_percentage < 0.75 THEN '50%-75%'
                    ELSE '75%-100%'
                END`)
                .orderBy("discount_range", "ASC")
                .getRawMany();
        });
    }
    getCategoryAvgRating() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo
                .createQueryBuilder("product")
                .select("category.name", "category_name")
                .addSelect("AVG(product.rating)", "avg_rating")
                .addSelect("COUNT(product.id)", "product_count")
                .addSelect("SUM(product.ratingCount)", "total_ratings")
                .innerJoin("product.category", "category")
                .where("product.rating IS NOT NULL")
                .groupBy("category.id")
                .addGroupBy("category.name")
                .orderBy("avg_rating", "DESC")
                .getRawMany();
        });
    }
    getReviewEngagementMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const productMetrics = yield this.productRepo
                .createQueryBuilder("product")
                .select("COUNT(product.id)", "total_products")
                .addSelect("SUM(product.ratingCount)", "total_ratings")
                .addSelect("AVG(product.rating)", "avg_rating")
                .addSelect("MAX(product.ratingCount)", "max_rating_count")
                .addSelect("MIN(product.ratingCount)", "min_rating_count")
                .where("product.ratingCount IS NOT NULL")
                .getRawOne();
            const totalReviews = yield this.reviewRepo.count();
            const totalProducts = Number(productMetrics.total_products) || 0;
            return {
                total_products: totalProducts,
                total_reviews: totalReviews,
                avg_reviews_per_product: totalProducts > 0 ? totalReviews / totalProducts : null,
                total_ratings: productMetrics.total_ratings,
                avg_rating: productMetrics.avg_rating,
                max_rating_count: productMetrics.max_rating_count,
                min_rating_count: productMetrics.min_rating_count
            };
        });
    }
};
exports.AnalyticsRepository = AnalyticsRepository;
exports.AnalyticsRepository = AnalyticsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(_core_database_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(_core_database_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsRepository);
//# sourceMappingURL=analytics.repository.js.map