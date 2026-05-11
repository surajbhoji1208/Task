'use client';

import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AnalyticsConstants } from '@ui-module/analytics';
import type { TopReviewedChartProps } from '../useAnalyticsList';

// #region Top Reviewed Chart Constants
const TopReviewedConstants = {
  BarColor: '#8b5cf6',
} as const;
// #endregion

// #region Top Reviewed Chart Component
const TopReviewedChart = ({ data, isLoading }: TopReviewedChartProps) => {
  const chartData = data.map((item) => ({
    name: item.productName.length > 25 ? `${item.productName.slice(0, 25)}...` : item.productName,
    fullName: item.productName,
    ratingCount: item.ratingCount,
    rating: item.rating,
  }));

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Skeleton height={32} width="60%" sx={{ mb: 2 }} />
          <Skeleton height={AnalyticsConstants.ChartHeight} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Reviewed Products
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Products ranked by number of reviews
        </Typography>
        <ResponsiveContainer width="100%" height={AnalyticsConstants.ChartHeight}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              width={140}
            />
            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()} reviews`,
                'Reviews',
              ]}
              labelFormatter={(label) => {
                const item = chartData.find((d) => d.name === label);
                return item?.fullName ?? label;
              }}
            />
            <Bar dataKey="ratingCount" fill={TopReviewedConstants.BarColor} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopReviewedChart;
// #endregion
