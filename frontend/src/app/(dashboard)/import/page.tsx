'use client';

import { Box, Typography, Card, CardContent } from '@mui/material';
import { ImportForm, ImportList } from '@/src/modules/import';

export default function ImportPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">
          Import Data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload CSV or Excel files to import product ratings and reviews
        </Typography>
      </Box>
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Upload File
          </Typography>
          <ImportForm />
        </CardContent>
      </Card>
      <ImportList />
    </Box>
  );
}
