'use client';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProductsPerCategoryChart from './components/ProductsPerCategoryChart';
import TopReviewedChart from './components/TopReviewedChart';
import DiscountDistributionChart from './components/DiscountDistributionChart';
import CategoryAvgRatingChart from './components/CategoryAvgRatingChart';
import { useAnalyticsList } from './useAnalyticsList';

// #region Analytics List Component
const AnalyticsList = () => {
  const {
    productsPerCategory,
    topReviewed,
    discountDistribution,
    categoryAvgRating,
  } = useAnalyticsList();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">
          Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visualize product ratings and review metrics
        </Typography>
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
        <Grid size={{ xs: 12, lg: 6 }}>
          <DiscountDistributionChart
            data={discountDistribution.data}
            isLoading={discountDistribution.isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CategoryAvgRatingChart
            data={categoryAvgRating.data}
            isLoading={categoryAvgRating.isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsList;
// #endregion
