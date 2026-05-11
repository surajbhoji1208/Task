import { Suspense } from 'react';
import { ProductList } from '@/src/modules/product';
import LoadingSpinner from '@core/components/ui/LoadingSpinner';

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading products..." />}>
      <ProductList />
    </Suspense>
  );
}
