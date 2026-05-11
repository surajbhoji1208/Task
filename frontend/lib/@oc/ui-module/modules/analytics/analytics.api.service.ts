import { apiClient } from '@ui-core-api';
import type {
  ProductsPerCategoryResponse,
  TopReviewedResponse,
  DiscountDistributionResponse,
  CategoryAvgRatingResponse,
  ReviewEngagementResponse,
} from './analytics.types';

// #region Analytics API Constants
const ANALYTICS_BASE_URL = '/v1/analytics';
// #endregion

// #region Analytics API Service
export const analyticsApiService = {
  async getProductsPerCategory(): Promise<ProductsPerCategoryResponse> {
    const response = await apiClient.get<ProductsPerCategoryResponse>(
      `${ANALYTICS_BASE_URL}/products-per-category`
    );
    return response.data;
  },

  async getTopReviewed(): Promise<TopReviewedResponse> {
    const response = await apiClient.get<TopReviewedResponse>(
      `${ANALYTICS_BASE_URL}/top-reviewed`
    );
    return response.data;
  },

  async getDiscountDistribution(): Promise<DiscountDistributionResponse> {
    const response = await apiClient.get<DiscountDistributionResponse>(
      `${ANALYTICS_BASE_URL}/discount-distribution`
    );
    return response.data;
  },

  async getCategoryAvgRating(): Promise<CategoryAvgRatingResponse> {
    const response = await apiClient.get<CategoryAvgRatingResponse>(
      `${ANALYTICS_BASE_URL}/category-avg-rating`
    );
    return response.data;
  },

  async getReviewEngagement(): Promise<ReviewEngagementResponse> {
    const response = await apiClient.get<ReviewEngagementResponse>(
      `${ANALYTICS_BASE_URL}/review-engagement`
    );
    return response.data;
  },
};
// #endregion
