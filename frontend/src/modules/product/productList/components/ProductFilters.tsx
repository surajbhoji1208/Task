'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Slider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ProductConstants } from '@ui-module/product';
import type { ProductFiltersProps } from '../useProductList';

// #region Product Filter Constants
const FilterConstants = {
  RatingMarks: [0, 1, 2, 3, 4, 5].map((v) => ({ value: v, label: v.toString() })),
  CategoryOptions: [
    'Computers',
    'Electronics',
    'Car & Motorbike',
    'Home & Kitchen',
    'Sports',
    'Toys & Games',
    'Office Products',
    'Music',
  ],
} as const;
// #endregion

// #region Product Filters Component
const ProductFilters = ({
  searchText = '',
  category = '',
  minRating,
  onSearchChange,
  onCategoryChange,
  onRatingChange,
  onClear,
}: ProductFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(searchText);

  useEffect(() => {
    setLocalSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchText) {
        onSearchChange(localSearch);
      }
    }, ProductConstants.DebounceDelay);
    return () => clearTimeout(timer);
  }, [localSearch, searchText, onSearchChange]);

  return (
    <Box sx={{ mb: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
      <Grid container spacing={2} sx={{ alignItems: 'flex-end' }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Search Products"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search by product name..."
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {FilterConstants.CategoryOptions.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Typography variant="body2" gutterBottom color="text.secondary">
            Min Rating: {minRating ?? 0}
          </Typography>
          <Slider
            value={minRating ?? 0}
            min={ProductConstants.MinRating}
            max={ProductConstants.MaxRating}
            step={0.5}
            marks={FilterConstants.RatingMarks}
            onChange={(_, value) =>
              onRatingChange(value === 0 ? undefined : (value as number))
            }
            valueLabelDisplay="auto"
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<ClearIcon />}
            onClick={onClear}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilters;
// #endregion
