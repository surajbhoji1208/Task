import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { importApiService } from './import.api.service';
import { ImportConstants } from './import.schema';
import type { ImportHistorySearchDto } from './import.types';
import type { ApiError } from '@ui-core-types';

// #region Import Query Keys
export const IMPORT_QUERY_KEYS = {
  all: ['import'] as const,
  histories: () => [...IMPORT_QUERY_KEYS.all, 'history'] as const,
  history: (params: ImportHistorySearchDto) =>
    [...IMPORT_QUERY_KEYS.histories(), params] as const,
};
// #endregion

// #region Import Query Hooks
export const useGetImportHistory = (params: ImportHistorySearchDto = {}) => {
  return useQuery({
    queryKey: IMPORT_QUERY_KEYS.history(params),
    queryFn: () => importApiService.getImportHistory(params),
    staleTime: ImportConstants.StaleTime,
  });
};
// #endregion

// #region Import Mutation Hooks
export const useImportProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => importApiService.importProducts(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMPORT_QUERY_KEYS.histories() });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Import failed. Please check your file and try again.');
    },
  });
};
// #endregion
