'use client';

import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

// #region Empty State Component
interface EmptyStateProps {
  message?: string;
  description?: string;
}

const EmptyState = ({
  message = 'No data found',
  description = 'There are no items to display.',
}: EmptyStateProps) => {
  return (
    <Box
      className="flex flex-col items-center justify-center"
      sx={{ py: 8, gap: 1 }}
    >
      <InboxIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;
// #endregion
