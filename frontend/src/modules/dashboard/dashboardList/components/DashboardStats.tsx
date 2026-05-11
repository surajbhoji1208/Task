'use client';

import Grid from '@mui/material/Grid';
import { Skeleton, Card, CardContent } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CategoryIcon from '@mui/icons-material/Category';
import StatCard from '@core/components/ui/StatCard';

// #region Dashboard Stats Props Interface
interface DashboardStatsProps {
  stats: {
    totalProducts: string;
    totalReviews: string;
    avgRating: string;
    totalCategories: string;
    avgReviewsPerProduct: string;
  } | null;
  isLoading: boolean;
}
// #endregion

// #region Dashboard Stats Component
const DashboardStats = ({ stats, isLoading }: DashboardStatsProps) => {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card>
              <CardContent>
                <Skeleton height={24} width="60%" />
                <Skeleton height={48} width="80%" />
                <Skeleton height={20} width="50%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!stats) return null;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="Across all categories"
          icon={<InventoryIcon />}
          color="#6366f1"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total Reviews"
          value={stats.totalReviews}
          subtitle="Customer reviews"
          icon={<RateReviewIcon />}
          color="#8b5cf6"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Average Rating"
          value={`${stats.avgRating} ⭐`}
          subtitle={`${stats.avgReviewsPerProduct} reviews/product avg`}
          icon={<StarIcon />}
          color="#f59e0b"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          subtitle="Product categories"
          icon={<CategoryIcon />}
          color="#10b981"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardStats;
// #endregion
