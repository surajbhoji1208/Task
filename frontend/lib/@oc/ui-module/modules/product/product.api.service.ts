import { apiClient } from '@ui-core-api';
import type {
  ProductSearchRequestDto,
  ProductListApiResponse,
  ProductDetailApiResponse,
} from './product.types';

// #region Product API Constants
const PRODUCT_BASE_URL = '/v1/products';
// #endregion

// #region Product API Service
export const productApiService = {
  async getProducts(params?: ProductSearchRequestDto): Promise<ProductListApiResponse> {
    const response = await apiClient.getList<ProductListApiResponse>(PRODUCT_BASE_URL, params as Record<string, unknown>);
    return response.data;
  },

  async getProductById(id: string): Promise<ProductDetailApiResponse> {
    const response = await apiClient.get<ProductDetailApiResponse>(`${PRODUCT_BASE_URL}/${id}`);
    return response.data;
  },
};
// #endregion
