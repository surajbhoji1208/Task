'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

// #region Loading Spinner Component
interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner = ({ message = 'Loading...', size = 40 }: LoadingSpinnerProps) => {
  return (
    <Box
      className="flex flex-col items-center justify-center"
      sx={{ py: 8, gap: 2 }}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
// #endregion
