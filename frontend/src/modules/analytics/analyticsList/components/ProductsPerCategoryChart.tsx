'use client';

import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
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
import type { ProductsPerCategoryChartProps } from '../useAnalyticsList';

// #region Chart Colors
const ChartColors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#4f46e5', '#7c3aed', '#6d28d9'] as const;
// #endregion

// #region Products Per Category Chart
const ProductsPerCategoryChart = ({ data, isLoading }: ProductsPerCategoryChartProps) => {
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
          Products Per Category
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Number of products in each category
        </Typography>
        <ResponsiveContainer width="100%" height={AnalyticsConstants.ChartHeight}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="categoryName"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [Number(value), 'Products']}
              labelStyle={{ fontWeight: 600 }}
            />
            <Bar dataKey="productCount" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={ChartColors[index % ChartColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProductsPerCategoryChart;
// #endregion
