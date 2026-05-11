import * as yup from 'yup';
import { searchTextValidation } from '@ui-core-schema';
import { OrderDirectionEnum } from '@ui-core-enums';

// #region Product Constants
export const ProductConstants = {
  DefaultPageSize: 10,
  MaxPageSize: 100,
  DebounceDelay: 500,
  StaleTime: 5 * 60 * 1000,
  MinRating: 0,
  MaxRating: 5,
  MinReviewCount: 0,
} as const;
// #endregion

// #region Product Search Schema
export const productSearchSchema = yup.object().shape({
  searchText: searchTextValidation.optional(),
  category: yup.string().optional(),
  minRating: yup
    .number()
    .min(ProductConstants.MinRating, `Rating must be at least ${ProductConstants.MinRating}`)
    .max(ProductConstants.MaxRating, `Rating cannot exceed ${ProductConstants.MaxRating}`)
    .optional(),
  minReviewCount: yup
    .number()
    .min(ProductConstants.MinReviewCount, 'Review count cannot be negative')
    .optional(),
  pageNumber: yup.number().min(1).optional(),
  pageSize: yup
    .number()
    .min(1)
    .max(ProductConstants.MaxPageSize, `Page size cannot exceed ${ProductConstants.MaxPageSize}`)
    .optional(),
  sortBy: yup.string().optional(),
  sortDirection: yup
    .string()
    .oneOf(Object.values(OrderDirectionEnum))
    .optional(),
});

export type ProductSearchFormValues = yup.InferType<typeof productSearchSchema>;
// #endregion
