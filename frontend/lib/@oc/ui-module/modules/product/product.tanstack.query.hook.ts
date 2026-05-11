import { useQuery } from '@tanstack/react-query';
import { productApiService } from './product.api.service';
import { ProductConstants } from './product.schema';
import type { ProductSearchRequestDto } from './product.types';

// #region Product Query Keys
export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  lists: () => [...PRODUCT_QUERY_KEYS.all, 'list'] as const,
  list: (params: ProductSearchRequestDto) =>
    [...PRODUCT_QUERY_KEYS.lists(), params] as const,
  details: () => [...PRODUCT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PRODUCT_QUERY_KEYS.details(), id] as const,
};
// #endregion

// #region Product Query Hooks
export const useGetProducts = (params: ProductSearchRequestDto = {}) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.list(params),
    queryFn: () => productApiService.getProducts(params),
    placeholderData: (previousData) => previousData,
    staleTime: ProductConstants.StaleTime,
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(id),
    queryFn: () => productApiService.getProductById(id),
    enabled: !!id,
    staleTime: ProductConstants.StaleTime,
  });
};
// #endregion
