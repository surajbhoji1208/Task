// #region Analytics Types
export type {
  ProductsPerCategoryDto,
  TopReviewedProductDto,
  DiscountBucketDto,
  CategoryAvgRatingDto,
  ReviewEngagementDto,
  ProductsPerCategoryResponse,
  TopReviewedResponse,
  DiscountDistributionResponse,
  CategoryAvgRatingResponse,
  ReviewEngagementResponse,
} from './analytics.types';
// #endregion

// #region Analytics Constants
export { AnalyticsConstants } from './analytics.schema';
// #endregion

// #region Analytics Hooks
export {
  useGetProductsPerCategory,
  useGetTopReviewed,
  useGetDiscountDistribution,
  useGetCategoryAvgRating,
  useGetReviewEngagement,
  ANALYTICS_QUERY_KEYS,
} from './analytics.tanstack.query.hook';
// #endregion

// #region Analytics Functions
export { analyticsFormFunctions } from './analytics.function.service';
// #endregion
