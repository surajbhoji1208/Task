'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useGetProducts, ProductConstants } from '@ui-module/product';
import type { ProductSearchRequestDto, Product } from '@ui-module/product';
import { OrderDirectionEnum } from '@ui-core-enums';

// #region Product List Hook Props Interface
export interface ProductTableProps {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChange: (field: string) => void;
  sortBy?: string;
  sortDirection?: string;
  isLoading: boolean;
  onProductClick: (productId: string) => void;
}

export interface ProductFiltersProps {
  searchText?: string;
  category?: string;
  minRating?: number;
  minReviewCount?: number;
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: string) => void;
  onRatingChange: (rating: number | undefined) => void;
  onReviewCountChange: (count: number | undefined) => void;
  onClear: () => void;
}
// #endregion

// #region Use Product List Hook
export const useProductList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(ProductConstants.DefaultPageSize);
  const [searchText, setSearchText] = useState(searchParams.get('searchText') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minRating, setMinRating] = useState<number | undefined>(
    searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined
  );
  const [minReviewCount, setMinReviewCount] = useState<number | undefined>(
    searchParams.get('minReviewCount') ? Number(searchParams.get('minReviewCount')) : undefined
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'productName');
  const [sortDirection, setSortDirection] = useState(
    searchParams.get('sortDirection') || OrderDirectionEnum.ASC
  );

  const queryParams: ProductSearchRequestDto = {
    pageNumber: page,
    pageSize,
    searchText: searchText || undefined,
    category: category || undefined,
    minRating,
    minReviewCount,
    sortBy,
    sortDirection,
  };

  const { data, isLoading, error, refetch } = useGetProducts(queryParams);

  const updateUrl = useCallback(
    (params: Record<string, string | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      });
      router.push(`${pathname}?${current.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      setPage(1);
      updateUrl({ searchText: text || undefined });
    },
    [updateUrl]
  );

  const handleCategoryChange = useCallback(
    (cat: string) => {
      setCategory(cat);
      setPage(1);
      updateUrl({ category: cat || undefined });
    },
    [updateUrl]
  );

  const handleRatingChange = useCallback(
    (rating: number | undefined) => {
      setMinRating(rating);
      setPage(1);
      updateUrl({ minRating: rating?.toString() });
    },
    [updateUrl]
  );

  const handleReviewCountChange = useCallback(
    (count: number | undefined) => {
      setMinReviewCount(count);
      setPage(1);
      updateUrl({ minReviewCount: count?.toString() });
    },
    [updateUrl]
  );

  const handleSortChange = useCallback(
    (field: string) => {
      const newDirection =
        sortBy === field && sortDirection === OrderDirectionEnum.ASC
          ? OrderDirectionEnum.DESC
          : OrderDirectionEnum.ASC;
      setSortBy(field);
      setSortDirection(newDirection);
      updateUrl({ sortBy: field, sortDirection: newDirection });
    },
    [sortBy, sortDirection, updateUrl]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchText('');
    setCategory('');
    setMinRating(undefined);
    setMinReviewCount(undefined);
    setPage(1);
    router.push(pathname);
  }, [pathname, router]);

  const handleProductClick = useCallback(
    (productId: string) => {
      router.push(`/products/${productId}`);
    },
    [router]
  );

  return {
    products: data?.data?.results ?? [],
    totalCount: data?.data?.totalCount ?? 0,
    page,
    pageSize,
    searchText,
    category,
    minRating,
    minReviewCount,
    sortBy,
    sortDirection,
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
  };
};
// #endregion
