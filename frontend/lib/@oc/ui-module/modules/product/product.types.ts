import type { ApiResponse, CommonSearchRequest, CommonSearchResponse } from '@ui-core-response';

// #region Product Entity Types
export interface Review {
  id: string;
  userName: string;
  reviewTitle: string;
  reviewContent: string;
  createdAt: string;
}

export interface Product {
  id: string;
  externalProductId: string;
  productName: string;
  categoryId: string;
  categoryName?: string;
  categoryPath?: string;
  discountedPrice?: number;
  actualPrice?: number;
  discountPercentage?: number;
  rating?: number;
  ratingCount?: number;
  aboutProduct?: string;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}
// #endregion

// #region Product DTO Types
export interface ProductSearchRequestDto extends CommonSearchRequest {
  category?: string;
  minRating?: number;
  minReviewCount?: number;
}

export interface ProductSearchResponseDto extends CommonSearchResponse<Product> {}
// #endregion

// #region Product API Response Types
export interface ProductListApiResponse extends ApiResponse<ProductSearchResponseDto> {}
export interface ProductDetailApiResponse extends ApiResponse<Product> {}
// #endregion
