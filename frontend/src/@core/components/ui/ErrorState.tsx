'use client';

import { Box, Typography, Button } from '@mui/material';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

// #region Error State Component
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <Box
      className="flex flex-col items-center justify-center"
      sx={{ py: 8, gap: 2 }}
    >
      <ErrorOutlinedIcon sx={{ fontSize: 64, color: 'error.main' }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
// #endregion
