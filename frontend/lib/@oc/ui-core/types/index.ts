// #region Common Types

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
    status?: number;
  };
  message?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn<T = unknown> {
  id: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface FilterState {
  searchText?: string;
  category?: string;
  minRating?: number;
  minReviewCount?: number;
  sortBy?: string;
  sortDirection?: string;
}
// #endregion
