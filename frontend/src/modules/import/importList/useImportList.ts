'use client';

import { useState } from 'react';
import { useGetImportHistory } from '@ui-module/import';

// #region Import History Table Props Interface
export interface ImportHistoryTableProps {
  historyItems: {
    id: string;
    fileName: string;
    totalRecords: number;
    importedRecords: number;
    skippedRecords: number;
    failedRecords: number;
    status: string;
    createdAt: string;
  }[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}
// #endregion

// #region Use Import List Hook
export const useImportList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useGetImportHistory({
    pageNumber: page,
    pageSize,
  });

  return {
    historyItems: data?.data?.results ?? [],
    totalCount: data?.data?.totalCount ?? 0,
    page,
    pageSize,
    isLoading,
    error,
    refetch,
    handlePageChange: setPage,
  };
};
// #endregion
