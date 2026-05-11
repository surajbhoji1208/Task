import { useQuery } from '@tanstack/react-query';
import { analyticsApiService } from './analytics.api.service';
import { AnalyticsConstants } from './analytics.schema';

// #region Analytics Query Keys
export const ANALYTICS_QUERY_KEYS = {
  all: ['analytics'] as const,
  productsPerCategory: () => [...ANALYTICS_QUERY_KEYS.all, 'products-per-category'] as const,
  topReviewed: () => [...ANALYTICS_QUERY_KEYS.all, 'top-reviewed'] as const,
  discountDistribution: () => [...ANALYTICS_QUERY_KEYS.all, 'discount-distribution'] as const,
  categoryAvgRating: () => [...ANALYTICS_QUERY_KEYS.all, 'category-avg-rating'] as const,
  reviewEngagement: () => [...ANALYTICS_QUERY_KEYS.all, 'review-engagement'] as const,
};
// #endregion

// #region Analytics Query Hooks
export const useGetProductsPerCategory = () => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.productsPerCategory(),
    queryFn: () => analyticsApiService.getProductsPerCategory(),
    staleTime: AnalyticsConstants.StaleTime,
  });
};

export const useGetTopReviewed = () => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.topReviewed(),
    queryFn: () => analyticsApiService.getTopReviewed(),
    staleTime: AnalyticsConstants.StaleTime,
  });
};

export const useGetDiscountDistribution = () => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.discountDistribution(),
    queryFn: () => analyticsApiService.getDiscountDistribution(),
    staleTime: AnalyticsConstants.StaleTime,
  });
};

export const useGetCategoryAvgRating = () => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.categoryAvgRating(),
    queryFn: () => analyticsApiService.getCategoryAvgRating(),
    staleTime: AnalyticsConstants.StaleTime,
  });
};

export const useGetReviewEngagement = () => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.reviewEngagement(),
    queryFn: () => analyticsApiService.getReviewEngagement(),
    staleTime: AnalyticsConstants.StaleTime,
  });
};
// #endregion
