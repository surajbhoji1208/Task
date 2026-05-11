'use client';

import { Card, CardContent, Typography, Chip, Box, Rating } from '@mui/material';
import { productFormFunctions } from '@ui-module/product';
import type { Product } from '@ui-module/product';

// #region Product Card Component
interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card
      sx={{ cursor: 'pointer', height: '100%' }}
      onClick={() => onClick(product.id)}
      className="hover:shadow-lg transition-shadow"
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom noWrap>
          {product.productName}
        </Typography>
        <Chip
          label={product.categoryName || 'N/A'}
          size="small"
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Box className="flex items-center gap-1 mt-1">
          <Rating value={product.rating ?? 0} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({productFormFunctions.formatReviewCount(product.ratingCount)} reviews)
          </Typography>
        </Box>
        <Box className="flex items-baseline justify-between mt-2">
          <Typography variant="h6" color="primary">
            {productFormFunctions.formatPrice(product.discountedPrice)}
          </Typography>
          {product.discountPercentage !== undefined && (
            <Chip
              label={productFormFunctions.formatDiscount(product.discountPercentage)}
              size="small"
              color="success"
            />
          )}
        </Box>
        {product.actualPrice !== undefined && (
          <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            {productFormFunctions.formatPrice(product.actualPrice)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
// #endregion
