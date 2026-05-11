'use client';

import { Box, Typography } from '@mui/material';
import ImportHistoryTable from './components/ImportHistoryTable';
import ErrorState from '@core/components/ui/ErrorState';
import { useImportList } from './useImportList';

// #region Import List Component
const ImportList = () => {
  const {
    historyItems,
    totalCount,
    page,
    pageSize,
    isLoading,
    error,
    refetch,
    handlePageChange,
  } = useImportList();

  if (error) {
    return (
      <ErrorState
        message="Failed to load import history."
        onRetry={refetch}
      />
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Import History
      </Typography>
      <ImportHistoryTable
        historyItems={historyItems}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ImportList;
// #endregion
