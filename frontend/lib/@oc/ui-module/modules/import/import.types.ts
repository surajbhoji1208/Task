import type { ApiResponse, CommonSearchResponse } from '@ui-core-response';
import type { ImportStatusEnum } from '@ui-core-enums';

// #region Import Entity Types
export interface ImportHistory {
  id: string;
  fileName: string;
  totalRecords: number;
  importedRecords: number;
  skippedRecords: number;
  failedRecords: number;
  status: ImportStatusEnum;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}
// #endregion

// #region Import DTO Types
export interface ImportHistorySearchDto {
  pageNumber?: number;
  pageSize?: number;
}

export interface ImportHistorySearchResponseDto extends CommonSearchResponse<ImportHistory> {}
// #endregion

// #region Import API Response Types
export interface ImportResponse extends ApiResponse<ImportHistory> {}
export interface ImportHistoryListResponse extends ApiResponse<ImportHistorySearchResponseDto> {}
// #endregion
