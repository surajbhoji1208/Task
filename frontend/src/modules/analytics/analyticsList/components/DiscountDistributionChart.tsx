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
  Legend,
} from 'recharts';
import { AnalyticsConstants } from '@ui-module/analytics';
import type { DiscountDistributionChartProps } from '../useAnalyticsList';

// #region Discount Distribution Chart Constants
const DiscountConstants = {
  BucketColors: {
    '0%-25%': '#10b981',
    '25%-50%': '#f59e0b',
    '50%-75%': '#ef4444',
    '75%-100%': '#8b5cf6',
  },
} as const;
// #endregion

// #region Discount Distribution Chart Component
const DiscountDistributionChart = ({ data, isLoading }: DiscountDistributionChartProps) => {
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

  const getColor = (range: string): string =>
    DiscountConstants.BucketColors[range as keyof typeof DiscountConstants.BucketColors] || '#6366f1';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Discount Distribution (Histogram)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Distribution of products across discount percentage buckets
        </Typography>
        <ResponsiveContainer width="100%" height={AnalyticsConstants.ChartHeight}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="discountRange" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="count" orientation="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="rating" orientation="right" domain={[0, 5]} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => [
                name === 'productCount'
                  ? `${Number(value).toLocaleString()} products`
                  : Number(value).toFixed(2),
                name === 'productCount' ? 'Product Count' : 'Avg Rating',
              ]}
            />
            <Legend />
            <Bar yAxisId="count" dataKey="productCount" name="productCount" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.discountRange)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DiscountDistributionChart;
// #endregion
