import { AppResponse } from "../../dto";
import { AppCacheService } from "../../../server-core/shared-modules";
import { CategoryAvgRatingDto, DiscountBucketDto, ProductsPerCategoryDto, ReviewEngagementDto, TopReviewedProductDto } from "./dto/response/analytics.response.dto";
import { AnalyticsRepository } from "./analytics.repository";
export declare class AnalyticsService {
    #private;
    private readonly analyticsRepository;
    private readonly appCacheService;
    private readonly ANALYTICS_CACHE_MODULE;
    constructor(analyticsRepository: AnalyticsRepository, appCacheService: AppCacheService);
    getProductsPerCategory(): Promise<AppResponse<ProductsPerCategoryDto[]>>;
    getTopReviewedProducts(): Promise<AppResponse<TopReviewedProductDto[]>>;
    getDiscountDistribution(): Promise<AppResponse<DiscountBucketDto[]>>;
    getCategoryAvgRating(): Promise<AppResponse<CategoryAvgRatingDto[]>>;
    getReviewEngagement(): Promise<AppResponse<ReviewEngagementDto>>;
    invalidateCache(): Promise<void>;
}
