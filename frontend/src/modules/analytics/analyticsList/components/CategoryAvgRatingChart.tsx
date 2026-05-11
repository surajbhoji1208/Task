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
  ReferenceLine,
  Cell,
} from 'recharts';
import { AnalyticsConstants } from '@ui-module/analytics';
import type { CategoryAvgRatingChartProps } from '../useAnalyticsList';

// #region Category Avg Rating Constants
const CategoryRatingConstants = {
  GoodRatingThreshold: 4.0,
  BarColorAbove: '#10b981',
  BarColorBelow: '#f59e0b',
} as const;
// #endregion

// #region Category Avg Rating Chart Component
const CategoryAvgRatingChart = ({ data, isLoading }: CategoryAvgRatingChartProps) => {
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

  const chartData = data.map((item) => ({
    ...item,
    avgRating: parseFloat(item.avgRating.toFixed(2)),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Category-wise Average Rating
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Average product rating per category. Green bars exceed {CategoryRatingConstants.GoodRatingThreshold} stars.
        </Typography>
        <ResponsiveContainer width="100%" height={AnalyticsConstants.ChartHeight}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="categoryName"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(2)} ⭐`,
                'Avg Rating',
              ]}
            />
            <ReferenceLine
              y={CategoryRatingConstants.GoodRatingThreshold}
              stroke="#6366f1"
              strokeDasharray="5 5"
              label={{ value: `${CategoryRatingConstants.GoodRatingThreshold}★`, position: 'right', fontSize: 12 }}
            />
            <Bar dataKey="avgRating" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.avgRating >= CategoryRatingConstants.GoodRatingThreshold
                      ? CategoryRatingConstants.BarColorAbove
                      : CategoryRatingConstants.BarColorBelow
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryAvgRatingChart;
// #endregion
