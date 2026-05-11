'use client';

import { Box, Typography } from '@mui/material';
import ProductTable from './components/ProductTable';
import ProductFilters from './components/ProductFilters';
import ErrorState from '@core/components/ui/ErrorState';
import { useProductList } from './useProductList';

// #region Product List Component
const ProductList = () => {
  const {
    products,
    totalCount,
    page,
    pageSize,
    searchText,
    category,
    minRating,
    isLoading,
    error,
    refetch,
    handleSearchChange,
    handleCategoryChange,
    handleRatingChange,
    handleReviewCountChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    handleClearFilters,
    handleProductClick,
    sortBy,
    sortDirection,
  } = useProductList();

  if (error) {
    return (
      <ErrorState
        message="Failed to load products. Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">
          Products
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse and search through all products with ratings and reviews
        </Typography>
      </Box>
      <ProductFilters
        searchText={searchText}
        category={category}
        minRating={minRating}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onRatingChange={handleRatingChange}
        onReviewCountChange={handleReviewCountChange}
        onClear={handleClearFilters}
      />
      <ProductTable
        products={products}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSortChange={handleSortChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
        isLoading={isLoading}
        onProductClick={handleProductClick}
      />
    </Box>
  );
};

export default ProductList;
// #endregion
