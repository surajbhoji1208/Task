'use client';

import {
  useGetProductsPerCategory,
  useGetTopReviewed,
  useGetDiscountDistribution,
  useGetCategoryAvgRating,
  useGetReviewEngagement,
} from '@ui-module/analytics';

// #region Analytics Chart Props Interfaces
export interface ProductsPerCategoryChartProps {
  data: { categoryName: string; productCount: number }[];
  isLoading: boolean;
}

export interface TopReviewedChartProps {
  data: {
    id: string;
    productName: string;
    categoryName: string;
    rating: number;
    ratingCount: number;
  }[];
  isLoading: boolean;
}

export interface DiscountDistributionChartProps {
  data: { discountRange: string; productCount: number; avgRating: number }[];
  isLoading: boolean;
}

export interface CategoryAvgRatingChartProps {
  data: {
    categoryName: string;
    avgRating: number;
    productCount: number;
    totalRatings: number;
  }[];
  isLoading: boolean;
}
// #endregion

// #region Use Analytics List Hook
export const useAnalyticsList = () => {
  const productsPerCategory = useGetProductsPerCategory();
  const topReviewed = useGetTopReviewed();
  const discountDistribution = useGetDiscountDistribution();
  const categoryAvgRating = useGetCategoryAvgRating();
  const reviewEngagement = useGetReviewEngagement();

  return {
    productsPerCategory: {
      data: productsPerCategory.data?.data ?? [],
      isLoading: productsPerCategory.isLoading,
      error: productsPerCategory.error,
    },
    topReviewed: {
      data: topReviewed.data?.data ?? [],
      isLoading: topReviewed.isLoading,
      error: topReviewed.error,
    },
    discountDistribution: {
      data: discountDistribution.data?.data ?? [],
      isLoading: discountDistribution.isLoading,
      error: discountDistribution.error,
    },
    categoryAvgRating: {
      data: categoryAvgRating.data?.data ?? [],
      isLoading: categoryAvgRating.isLoading,
      error: categoryAvgRating.error,
    },
    reviewEngagement: {
      data: reviewEngagement.data?.data ?? null,
      isLoading: reviewEngagement.isLoading,
      error: reviewEngagement.error,
    },
  };
};
// #endregion
