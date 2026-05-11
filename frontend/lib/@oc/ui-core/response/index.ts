// #region API Response Types

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface CommonSearchRequest {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  [key: string]: unknown;
}

export interface CommonSearchResponse<T> {
  results: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export type PaginatedApiResponse<T> = ApiResponse<CommonSearchResponse<T>>;

export interface CommonDropdownResponse {
  id: string;
  name: string;
}
// #endregion
