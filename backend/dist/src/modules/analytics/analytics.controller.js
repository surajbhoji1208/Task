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
exports.AnalyticsController = void 0;
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _core_custom_decorators_1 = require("../../../libs/@oc/server-core/custom-decorators");
const _core_custom_guards_1 = require("../../../libs/@oc/server-core/custom-guards");
const _core_enums_1 = require("../../../libs/@oc/server-core/enums");
const _core_utilities_1 = require("../../../libs/@oc/server-core/utilities");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ANALYTICS_MODULE_NAME = (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS);
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getProductsPerCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.analyticsService.getProductsPerCategory();
        });
    }
    getTopReviewedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.analyticsService.getTopReviewedProducts();
        });
    }
    getDiscountDistribution() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.analyticsService.getDiscountDistribution();
        });
    }
    getCategoryAvgRating() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.analyticsService.getCategoryAvgRating();
        });
    }
    getReviewEngagement() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.analyticsService.getReviewEngagement();
        });
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)("products-per-category"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Number of products per category", [common_1.HttpStatus.OK], ANALYTICS_MODULE_NAME, _business_core_modules_1.ProductsPerCategoryDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getProductsPerCategory", null);
__decorate([
    (0, common_1.Get)("top-reviewed"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Top 10 most reviewed products", [common_1.HttpStatus.OK], ANALYTICS_MODULE_NAME, _business_core_modules_1.TopReviewedProductDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getTopReviewedProducts", null);
__decorate([
    (0, common_1.Get)("discount-distribution"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Product count grouped by discount percentage range", [common_1.HttpStatus.OK], ANALYTICS_MODULE_NAME, _business_core_modules_1.DiscountBucketDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getDiscountDistribution", null);
__decorate([
    (0, common_1.Get)("category-avg-rating"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Average product rating per category", [common_1.HttpStatus.OK], ANALYTICS_MODULE_NAME, _business_core_modules_1.CategoryAvgRatingDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCategoryAvgRating", null);
__decorate([
    (0, common_1.Get)("review-engagement"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Overall review engagement metrics", [common_1.HttpStatus.OK], ANALYTICS_MODULE_NAME, _business_core_modules_1.ReviewEngagementDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getReviewEngagement", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)("Analytics"),
    (0, common_1.Controller)("analytics"),
    (0, common_1.UseGuards)(_core_custom_guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [_business_core_modules_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map