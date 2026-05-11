import type { ApiError } from '@ui-core-types';
import { toast } from 'react-toastify';

// #region Analytics Functions
export const analyticsFormFunctions = {
  handleFormError: (error: ApiError) => {
    const message = error?.response?.data?.message || 'Failed to load analytics data.';
    toast.error(message);
  },

  formatAvgRating: (rating: number): string => rating.toFixed(2),

  formatCount: (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  },
};
// #endregion
