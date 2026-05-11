import { AppResponse } from "@business-core-dto";
import { MODULE_CONSTANTS, SuccessConstant } from "@core-constants";
import { ModuleName } from "@core-enums";
import { AppCacheService } from "@core-shared-modules";
import { GenerateLogPrefix, GetCacheKey, MapToModuleName } from "@core-utilities";
import { Injectable, Logger } from "@nestjs/common";
import {
    CategoryAvgRatingDto,
    DiscountBucketDto,
    ProductsPerCategoryDto,
    ReviewEngagementDto,
    TopReviewedProductDto
} from "./dto/response/analytics.response.dto";
import { AnalyticsRepository } from "./analytics.repository";

const TOP_REVIEWED_LIMIT = 10;

@Injectable()
export class AnalyticsService {
    readonly #logger: Logger = new Logger(AnalyticsService.name);
    private readonly ANALYTICS_CACHE_MODULE = MODULE_CONSTANTS.ANALYTICS;

    constructor(
        private readonly analyticsRepository: AnalyticsRepository,
        private readonly appCacheService: AppCacheService
    ) {}

    async getProductsPerCategory(): Promise<AppResponse<ProductsPerCategoryDto[]>> {
        const logPrefix = GenerateLogPrefix(this.getProductsPerCategory.name);
        const cacheKey = GetCacheKey(this.ANALYTICS_CACHE_MODULE, "products-per-category", true);

        this.#logger.debug(`${logPrefix} : Fetching products per category`);

        const cached = await this.appCacheService.get<ProductsPerCategoryDto[]>(cacheKey);
        if (cached) {
            return new AppResponse(SuccessConstant.ListFetch, cached, {
                module: MapToModuleName(ModuleName.ANALYTICS)
            });
        }

        const rows = await this.analyticsRepository.getProductsPerCategory();
        const data = rows.map((r) => new ProductsPerCategoryDto(r));

        await this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });

        this.#logger.debug(`${logPrefix} : Products per category fetched`);

        return new AppResponse(SuccessConstant.ListFetch, data, {
            module: MapToModuleName(ModuleName.ANALYTICS)
        });
    }

    async getTopReviewedProducts(): Promise<AppResponse<TopReviewedProductDto[]>> {
        const logPrefix = GenerateLogPrefix(this.getTopReviewedProducts.name);
        const cacheKey = GetCacheKey(this.ANALYTICS_CACHE_MODULE, "top-reviewed", true);

        this.#logger.debug(`${logPrefix} : Fetching top reviewed products`);

        const cached = await this.appCacheService.get<TopReviewedProductDto[]>(cacheKey);
        if (cached) {
            return new AppResponse(SuccessConstant.ListFetch, cached, {
                module: MapToModuleName(ModuleName.ANALYTICS)
            });
        }

        const rows = await this.analyticsRepository.getTopReviewedProducts(TOP_REVIEWED_LIMIT);
        const data = rows.map((r) => new TopReviewedProductDto(r));

        await this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });

        this.#logger.debug(`${logPrefix} : Top reviewed products fetched`);

        return new AppResponse(SuccessConstant.ListFetch, data, {
            module: MapToModuleName(ModuleName.ANALYTICS)
        });
    }

    async getDiscountDistribution(): Promise<AppResponse<DiscountBucketDto[]>> {
        const logPrefix = GenerateLogPrefix(this.getDiscountDistribution.name);
        const cacheKey = GetCacheKey(this.ANALYTICS_CACHE_MODULE, "discount-distribution", true);

        this.#logger.debug(`${logPrefix} : Fetching discount distribution`);

        const cached = await this.appCacheService.get<DiscountBucketDto[]>(cacheKey);
        if (cached) {
            return new AppResponse(SuccessConstant.ListFetch, cached, {
                module: MapToModuleName(ModuleName.ANALYTICS)
            });
        }

        const rows = await this.analyticsRepository.getDiscountDistribution();
        const data = rows.map((r) => new DiscountBucketDto(r));

        await this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });

        this.#logger.debug(`${logPrefix} : Discount distribution fetched`);

        return new AppResponse(SuccessConstant.ListFetch, data, {
            module: MapToModuleName(ModuleName.ANALYTICS)
        });
    }

    async getCategoryAvgRating(): Promise<AppResponse<CategoryAvgRatingDto[]>> {
        const logPrefix = GenerateLogPrefix(this.getCategoryAvgRating.name);
        const cacheKey = GetCacheKey(this.ANALYTICS_CACHE_MODULE, "category-avg-rating", true);

        this.#logger.debug(`${logPrefix} : Fetching category average ratings`);

        const cached = await this.appCacheService.get<CategoryAvgRatingDto[]>(cacheKey);
        if (cached) {
            return new AppResponse(SuccessConstant.ListFetch, cached, {
                module: MapToModuleName(ModuleName.ANALYTICS)
            });
        }

        const rows = await this.analyticsRepository.getCategoryAvgRating();
        const data = rows.map((r) => new CategoryAvgRatingDto(r));

        await this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });

        this.#logger.debug(`${logPrefix} : Category average ratings fetched`);

        return new AppResponse(SuccessConstant.ListFetch, data, {
            module: MapToModuleName(ModuleName.ANALYTICS)
        });
    }

    async getReviewEngagement(): Promise<AppResponse<ReviewEngagementDto>> {
        const logPrefix = GenerateLogPrefix(this.getReviewEngagement.name);
        const cacheKey = GetCacheKey(this.ANALYTICS_CACHE_MODULE, "review-engagement", false);

        this.#logger.debug(`${logPrefix} : Fetching review engagement metrics`);

        const cached = await this.appCacheService.get<ReviewEngagementDto>(cacheKey);
        if (cached) {
            return new AppResponse(SuccessConstant.DetailFetch, cached, {
                module: MapToModuleName(ModuleName.ANALYTICS)
            });
        }

        const raw = await this.analyticsRepository.getReviewEngagementMetrics();
        const data = new ReviewEngagementDto(raw);

        await this.appCacheService.set(cacheKey, data, 60, { module: this.ANALYTICS_CACHE_MODULE });

        this.#logger.debug(`${logPrefix} : Review engagement metrics fetched`);

        return new AppResponse(SuccessConstant.DetailFetch, data, {
            module: MapToModuleName(ModuleName.ANALYTICS)
        });
    }

    async invalidateCache(): Promise<void> {
        await this.appCacheService.clearListCachesByModule(this.ANALYTICS_CACHE_MODULE);
    }
}
