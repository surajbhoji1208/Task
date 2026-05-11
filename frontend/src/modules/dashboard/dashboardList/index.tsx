'use client';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DashboardStats from './components/DashboardStats';
import { useDashboardList } from './useDashboardList';
import ProductsPerCategoryChart from '../../analytics/analyticsList/components/ProductsPerCategoryChart';
import TopReviewedChart from '../../analytics/analyticsList/components/TopReviewedChart';
import { useAnalyticsList } from '../../analytics/analyticsList/useAnalyticsList';

// #region Dashboard List Component
const DashboardList = () => {
  const { stats, isLoading } = useDashboardList();
  const { productsPerCategory, topReviewed } = useAnalyticsList();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Product ratings & review analytics at a glance
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <DashboardStats stats={stats} isLoading={isLoading} />
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ProductsPerCategoryChart
            data={productsPerCategory.data}
            isLoading={productsPerCategory.isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TopReviewedChart
            data={topReviewed.data}
            isLoading={topReviewed.isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardList;
// #endregion
