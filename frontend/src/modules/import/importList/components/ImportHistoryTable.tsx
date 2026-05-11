'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Typography,
  Skeleton,
  Box,
} from '@mui/material';
import { ImportStatusEnum } from '@ui-core-enums';
import EmptyState from '@core/components/ui/EmptyState';
import type { ImportHistoryTableProps } from '../useImportList';

// #region Import Status Colors
const StatusColorMap: Record<string, 'success' | 'warning' | 'error'> = {
  [ImportStatusEnum.COMPLETED]: 'success',
  [ImportStatusEnum.PROCESSING]: 'warning',
  [ImportStatusEnum.FAILED]: 'error',
};
// #endregion

// #region Import History Table Component
const ImportHistoryTable = ({
  historyItems,
  totalCount,
  page,
  pageSize,
  onPageChange,
  isLoading,
}: ImportHistoryTableProps) => {
  if (isLoading) {
    return (
      <Paper>
        <Box sx={{ p: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />
          ))}
        </Box>
      </Paper>
    );
  }

  if (historyItems.length === 0) {
    return (
      <Paper>
        <EmptyState
          message="No import history"
          description="Upload a CSV or Excel file to get started."
        />
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, backgroundColor: 'background.default' } }}>
              <TableCell>File Name</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Imported</TableCell>
              <TableCell align="center">Skipped</TableCell>
              <TableCell align="center">Failed</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Typography variant="body2">
                    {item.fileName}
                  </Typography>
                </TableCell>
                <TableCell align="center">{item.totalRecords.toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="success.main">
                    {item.importedRecords.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="warning.main">
                    {item.skippedRecords.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="error.main">
                    {item.failedRecords.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    color={StatusColorMap[item.status] ?? 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.createdAt).toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
      />
    </Paper>
  );
};

export default ImportHistoryTable;
// #endregion
