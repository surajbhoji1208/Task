export declare class ProductsPerCategoryDto {
    constructor(data: any);
    categoryName: string;
    productCount: number;
}
export declare class TopReviewedProductDto {
    constructor(data: any);
    id: string;
    externalProductId: string;
    productName: string;
    categoryName: string | null;
    rating: number | null;
    ratingCount: number | null;
    discountedPrice: number | null;
}
export declare class DiscountBucketDto {
    constructor(data: any);
    discountRange: string;
    productCount: number;
    avgRating: number | null;
}
export declare class CategoryAvgRatingDto {
    constructor(data: any);
    categoryName: string;
    avgRating: number | null;
    productCount: number;
    totalRatings: number | null;
}
export declare class ReviewEngagementDto {
    constructor(data: any);
    totalProducts: number;
    totalReviews: number;
    avgReviewsPerProduct: number | null;
    totalRatings: number | null;
    avgRating: number | null;
    maxRatingCount: number | null;
    minRatingCount: number | null;
}
