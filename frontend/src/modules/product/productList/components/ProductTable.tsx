'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Chip,
  Rating,
  Skeleton,
  Box,
  Typography,
} from '@mui/material';
import { productFormFunctions } from '@ui-module/product';
import { OrderDirectionEnum } from '@ui-core-enums';
import EmptyState from '@core/components/ui/EmptyState';
import type { ProductTableProps } from '../useProductList';

// #region Product Table Component
const ProductTable = ({
  products,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  sortBy,
  sortDirection,
  isLoading,
  onProductClick,
}: ProductTableProps) => {
  const columns = [
    { id: 'productName', label: 'Product Name', sortable: true, width: '30%' },
    { id: 'categoryName', label: 'Category', sortable: true, width: '15%' },
    { id: 'rating', label: 'Rating', sortable: true, width: '15%' },
    { id: 'ratingCount', label: 'Reviews', sortable: true, width: '10%' },
    { id: 'discountedPrice', label: 'Price', sortable: true, width: '12%' },
    { id: 'discountPercentage', label: 'Discount', sortable: false, width: '10%' },
    { id: 'actualPrice', label: 'Original', sortable: false, width: '8%' },
  ];

  if (isLoading) {
    return (
      <Paper>
        <Box sx={{ p: 2 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />
          ))}
        </Box>
      </Paper>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <Paper>
        <EmptyState
          message="No products found"
          description="Try adjusting your search filters."
        />
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, backgroundColor: 'background.default' } }}>
              {columns.map((col) => (
                <TableCell key={col.id} width={col.width}>
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortBy === col.id}
                      direction={
                        sortBy === col.id
                          ? sortDirection === OrderDirectionEnum.DESC
                            ? 'desc'
                            : 'asc'
                          : 'asc'
                      }
                      onClick={() => onSortChange(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                onClick={() => onProductClick(product.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 250 }}>
                    {product.productName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.categoryName || 'N/A'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Box className="flex items-center gap-1">
                    <Rating
                      value={product.rating ?? 0}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography variant="caption" color="text.secondary">
                      {productFormFunctions.formatRating(product.rating)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {productFormFunctions.formatReviewCount(product.ratingCount)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary">
                    {productFormFunctions.formatPrice(product.discountedPrice)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {product.discountPercentage !== undefined && (
                    <Chip
                      label={productFormFunctions.formatDiscount(product.discountPercentage)}
                      size="small"
                      color="success"
                      variant="filled"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    {productFormFunctions.formatPrice(product.actualPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => onPageSizeChange(Number(e.target.value))}
      />
    </Paper>
  );
};

export default ProductTable;
// #endregion
