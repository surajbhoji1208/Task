import { AppResponse } from "@business-core-dto";
import {
    AnalyticsService,
    CategoryAvgRatingDto,
    DiscountBucketDto,
    ProductsPerCategoryDto,
    ReviewEngagementDto,
    TopReviewedProductDto
} from "@business-core-modules";
import { ApiResponseStatus } from "@core-custom-decorators";
import { JwtAuthGuard } from "@core-custom-guards";
import { ModuleName } from "@core-enums";
import { MapToModuleName } from "@core-utilities";
import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

const ANALYTICS_MODULE_NAME = MapToModuleName(ModuleName.ANALYTICS);

@ApiTags("Analytics")
@Controller("analytics")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get("products-per-category")
    @ApiResponseStatus(
        "Number of products per category",
        [HttpStatus.OK],
        ANALYTICS_MODULE_NAME,
        ProductsPerCategoryDto
    )
    async getProductsPerCategory(): Promise<AppResponse<ProductsPerCategoryDto[]>> {
        return this.analyticsService.getProductsPerCategory();
    }

    @Get("top-reviewed")
    @ApiResponseStatus(
        "Top 10 most reviewed products",
        [HttpStatus.OK],
        ANALYTICS_MODULE_NAME,
        TopReviewedProductDto
    )
    async getTopReviewedProducts(): Promise<AppResponse<TopReviewedProductDto[]>> {
        return this.analyticsService.getTopReviewedProducts();
    }

    @Get("discount-distribution")
    @ApiResponseStatus(
        "Product count grouped by discount percentage range",
        [HttpStatus.OK],
        ANALYTICS_MODULE_NAME,
        DiscountBucketDto
    )
    async getDiscountDistribution(): Promise<AppResponse<DiscountBucketDto[]>> {
        return this.analyticsService.getDiscountDistribution();
    }

    @Get("category-avg-rating")
    @ApiResponseStatus(
        "Average product rating per category",
        [HttpStatus.OK],
        ANALYTICS_MODULE_NAME,
        CategoryAvgRatingDto
    )
    async getCategoryAvgRating(): Promise<AppResponse<CategoryAvgRatingDto[]>> {
        return this.analyticsService.getCategoryAvgRating();
    }

    @Get("review-engagement")
    @ApiResponseStatus(
        "Overall review engagement metrics",
        [HttpStatus.OK],
        ANALYTICS_MODULE_NAME,
        ReviewEngagementDto
    )
    async getReviewEngagement(): Promise<AppResponse<ReviewEngagementDto>> {
        return this.analyticsService.getReviewEngagement();
    }
}
