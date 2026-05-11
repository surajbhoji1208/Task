import type { ApiResponse } from '@ui-core-response';

// #region Analytics DTO Types
export interface ProductsPerCategoryDto {
  categoryName: string;
  productCount: number;
}

export interface TopReviewedProductDto {
  id: string;
  productName: string;
  categoryName: string;
  rating: number;
  ratingCount: number;
  discountedPrice?: number;
}

export interface DiscountBucketDto {
  discountRange: string;
  productCount: number;
  avgRating: number;
}

export interface CategoryAvgRatingDto {
  categoryName: string;
  avgRating: number;
  productCount: number;
  totalRatings: number;
}

export interface ReviewEngagementDto {
  totalProducts: number;
  totalReviews: number;
  avgReviewsPerProduct: number;
  totalRatings: number;
  avgRating: number;
  maxRatingCount: number;
  minRatingCount: number;
}
// #endregion

// #region Analytics API Response Types
export interface ProductsPerCategoryResponse extends ApiResponse<ProductsPerCategoryDto[]> {}
export interface TopReviewedResponse extends ApiResponse<TopReviewedProductDto[]> {}
export interface DiscountDistributionResponse extends ApiResponse<DiscountBucketDto[]> {}
export interface CategoryAvgRatingResponse extends ApiResponse<CategoryAvgRatingDto[]> {}
export interface ReviewEngagementResponse extends ApiResponse<ReviewEngagementDto> {}
// #endregion
