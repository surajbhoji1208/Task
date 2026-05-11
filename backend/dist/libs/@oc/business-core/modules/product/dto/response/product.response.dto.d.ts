export declare class ReviewSummaryDto {
    constructor(review: any);
    id: string;
    userName: string | null;
    reviewTitle: string | null;
    reviewContent: string | null;
}
export declare class ProductResponseDto {
    constructor(product: any);
    id: string;
    externalProductId: string;
    productName: string;
    categoryId: string | null;
    categoryPath: string | null;
    categoryName: string | null;
    discountedPrice: number | null;
    actualPrice: number | null;
    discountPercentage: number | null;
    rating: number | null;
    ratingCount: number | null;
    aboutProduct: string | null;
    reviews: ReviewSummaryDto[];
    createdAt: Date;
    updatedAt: Date;
}
