import { apiClient } from '@ui-core-api';
import type {
  ImportResponse,
  ImportHistoryListResponse,
  ImportHistorySearchDto,
} from './import.types';

// #region Import API Constants
const IMPORT_BASE_URL = '/v1/import';
// #endregion

// #region Import API Service
export const importApiService = {
  async importProducts(file: File): Promise<ImportResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.upload<ImportResponse>(`${IMPORT_BASE_URL}/products`, formData);
    return response.data;
  },

  async getImportHistory(params?: ImportHistorySearchDto): Promise<ImportHistoryListResponse> {
    const response = await apiClient.getList<ImportHistoryListResponse>(
      `${IMPORT_BASE_URL}/history`,
      params as Record<string, unknown>
    );
    return response.data;
  },
};
// #endregion
