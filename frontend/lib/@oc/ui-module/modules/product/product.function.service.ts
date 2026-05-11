import type { ApiError } from '@ui-core-types';
import { toast } from 'react-toastify';

// #region Product Form Functions
export const productFormFunctions = {
  handleFormError: (error: ApiError) => {
    const message = error?.response?.data?.message || 'An error occurred. Please try again.';
    toast.error(message);
  },

  formatPrice: (price?: number): string => {
    if (price === undefined || price === null) return 'N/A';
    return `₹${price.toLocaleString('en-IN')}`;
  },

  formatRating: (rating?: number): string => {
    if (rating === undefined || rating === null) return 'N/A';
    return rating.toFixed(1);
  },

  formatDiscount: (discount?: number): string => {
    if (discount === undefined || discount === null) return 'N/A';
    return `${Math.round(discount * 100)}%`;
  },

  formatReviewCount: (count?: number): string => {
    if (count === undefined || count === null) return '0';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  },
};
// #endregion
