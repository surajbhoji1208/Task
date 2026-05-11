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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _AnalyticsService_logger;
var AnalyticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const _business_core_dto_1 = require("../../dto");
const _core_constants_1 = require("../../../server-core/constants");
const _core_enums_1 = require("../../../server-core/enums");
const _core_shared_modules_1 = require("../../../server-core/shared-modules");
const _core_utilities_1 = require("../../../server-core/utilities");
const common_1 = require("@nestjs/common");
const analytics_response_dto_1 = require("./dto/response/analytics.response.dto");
const analytics_repository_1 = require("./analytics.repository");
const TOP_REVIEWED_LIMIT = 10;
let AnalyticsService = AnalyticsService_1 = _a = class AnalyticsService {
    constructor(analyticsRepository, appCacheService) {
        this.analyticsRepository = analyticsRepository;
        this.appCacheService = appCacheService;
        _AnalyticsService_logger.set(this, new common_1.Logger(AnalyticsService_1.name));
        this.ANALYTICS_CACHE_MODULE = _core_constants_1.MODULE_CONSTANTS.ANALYTICS;
    }
    getProductsPerCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.getProductsPerCategory.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.ANALYTICS_CACHE_MODULE, "products-per-category", true);
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Fetching products per category`);
            const cached = yield this.appCacheService.get(cacheKey);
            if (cached) {
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, cached, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
                });
            }
            const rows = yield this.analyticsRepository.getProductsPerCategory();
            const data = rows.map((r) => new analytics_response_dto_1.ProductsPerCategoryDto(r));
            yield this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Products per category fetched`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, data, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
            });
        });
    }
    getTopReviewedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.getTopReviewedProducts.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.ANALYTICS_CACHE_MODULE, "top-reviewed", true);
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Fetching top reviewed products`);
            const cached = yield this.appCacheService.get(cacheKey);
            if (cached) {
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, cached, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
                });
            }
            const rows = yield this.analyticsRepository.getTopReviewedProducts(TOP_REVIEWED_LIMIT);
            const data = rows.map((r) => new analytics_response_dto_1.TopReviewedProductDto(r));
            yield this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Top reviewed products fetched`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, data, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
            });
        });
    }
    getDiscountDistribution() {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.getDiscountDistribution.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.ANALYTICS_CACHE_MODULE, "discount-distribution", true);
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Fetching discount distribution`);
            const cached = yield this.appCacheService.get(cacheKey);
            if (cached) {
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, cached, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
                });
            }
            const rows = yield this.analyticsRepository.getDiscountDistribution();
            const data = rows.map((r) => new analytics_response_dto_1.DiscountBucketDto(r));
            yield this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Discount distribution fetched`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, data, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
            });
        });
    }
    getCategoryAvgRating() {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.getCategoryAvgRating.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.ANALYTICS_CACHE_MODULE, "category-avg-rating", true);
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Fetching category average ratings`);
            const cached = yield this.appCacheService.get(cacheKey);
            if (cached) {
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, cached, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
                });
            }
            const rows = yield this.analyticsRepository.getCategoryAvgRating();
            const data = rows.map((r) => new analytics_response_dto_1.CategoryAvgRatingDto(r));
            yield this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Category average ratings fetched`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, data, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
            });
        });
    }
    getReviewEngagement() {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.getReviewEngagement.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.ANALYTICS_CACHE_MODULE, "review-engagement", false);
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Fetching review engagement metrics`);
            const cached = yield this.appCacheService.get(cacheKey);
            if (cached) {
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.DetailFetch, cached, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
                });
            }
            const raw = yield this.analyticsRepository.getReviewEngagementMetrics();
            const data = new analytics_response_dto_1.ReviewEngagementDto(raw);
            yield this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });
            __classPrivateFieldGet(this, _AnalyticsService_logger, "f").debug(`${logPrefix} : Review engagement metrics fetched`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.DetailFetch, data, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.ANALYTICS)
            });
        });
    }
    invalidateCache() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.appCacheService.clearListCachesByModule(this.ANALYTICS_CACHE_MODULE);
        });
    }
};
exports.AnalyticsService = AnalyticsService;
_AnalyticsService_logger = new WeakMap();
exports.AnalyticsService = AnalyticsService = AnalyticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [analytics_repository_1.AnalyticsRepository,
        _core_shared_modules_1.AppCacheService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map