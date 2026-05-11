'use client';

import { useGetReviewEngagement, useGetProductsPerCategory } from '@ui-module/analytics';
import { analyticsFormFunctions } from '@ui-module/analytics';

// #region Use Dashboard List Hook
export const useDashboardList = () => {
  const reviewEngagement = useGetReviewEngagement();
  const productsPerCategory = useGetProductsPerCategory();

  const stats = reviewEngagement.data?.data
    ? {
        totalProducts: analyticsFormFunctions.formatCount(reviewEngagement.data.data.totalProducts),
        totalReviews: analyticsFormFunctions.formatCount(reviewEngagement.data.data.totalReviews),
        avgRating: analyticsFormFunctions.formatAvgRating(reviewEngagement.data.data.avgRating),
        totalCategories: productsPerCategory.data?.data?.length?.toString() ?? '0',
        avgReviewsPerProduct: Math.round(reviewEngagement.data.data.avgReviewsPerProduct).toString(),
      }
    : null;

  return {
    stats,
    isLoading: reviewEngagement.isLoading || productsPerCategory.isLoading,
  };
};
// #endregion
