import { AppResponse } from "../../../libs/@oc/business-core/dto";
import { AnalyticsService, CategoryAvgRatingDto, DiscountBucketDto, ProductsPerCategoryDto, ReviewEngagementDto, TopReviewedProductDto } from "../../../libs/@oc/business-core/modules";
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getProductsPerCategory(): Promise<AppResponse<ProductsPerCategoryDto[]>>;
    getTopReviewedProducts(): Promise<AppResponse<TopReviewedProductDto[]>>;
    getDiscountDistribution(): Promise<AppResponse<DiscountBucketDto[]>>;
    getCategoryAvgRating(): Promise<AppResponse<CategoryAvgRatingDto[]>>;
    getReviewEngagement(): Promise<AppResponse<ReviewEngagementDto>>;
}
