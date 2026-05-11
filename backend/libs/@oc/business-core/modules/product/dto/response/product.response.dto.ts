import { ApiProperty } from "@nestjs/swagger";

export class ReviewSummaryDto {
    constructor(review: any) {
        this.id = review.id;
        this.userName = review.userName;
        this.reviewTitle = review.reviewTitle;
        this.reviewContent = review.reviewContent;
    }

    @ApiProperty({ description: "Review unique identifier" })
    id: string;

    @ApiProperty({ description: "Reviewer username", nullable: true })
    userName: string | null;

    @ApiProperty({ description: "Review title", nullable: true })
    reviewTitle: string | null;

    @ApiProperty({ description: "Review content", nullable: true })
    reviewContent: string | null;
}

export class ProductResponseDto {
    constructor(product: any) {
        this.id = product.id;
        this.externalProductId = product.externalProductId;
        this.productName = product.productName;
        this.categoryId = product.categoryId;
        this.categoryPath = product.categoryPath;
        this.categoryName = product.category?.name ?? product.categoryName ?? null;
        this.discountedPrice = product.discountedPrice != null ? Number(product.discountedPrice) : null;
        this.actualPrice = product.actualPrice != null ? Number(product.actualPrice) : null;
        this.discountPercentage = product.discountPercentage != null ? Number(product.discountPercentage) : null;
        this.rating = product.rating != null ? Number(product.rating) : null;
        this.ratingCount = product.ratingCount;
        this.aboutProduct = product.aboutProduct;
        this.reviews = Array.isArray(product.reviews)
            ? product.reviews.map((r: any) => new ReviewSummaryDto(r))
            : [];
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }

    @ApiProperty({ description: "Product unique identifier" })
    id: string;

    @ApiProperty({ description: "External product ID from source dataset", example: "B07JW9H4J1" })
    externalProductId: string;

    @ApiProperty({ description: "Product name" })
    productName: string;

    @ApiProperty({ description: "Category UUID", nullable: true })
    categoryId: string | null;

    @ApiProperty({ description: "Full category hierarchy path", nullable: true })
    categoryPath: string | null;

    @ApiProperty({ description: "Top-level category name", nullable: true })
    categoryName: string | null;

    @ApiProperty({ description: "Discounted price", nullable: true })
    discountedPrice: number | null;

    @ApiProperty({ description: "Original price before discount", nullable: true })
    actualPrice: number | null;

    @ApiProperty({ description: "Discount percentage (0–1 decimal)", nullable: true })
    discountPercentage: number | null;

    @ApiProperty({ description: "Average product rating", nullable: true })
    rating: number | null;

    @ApiProperty({ description: "Total number of ratings", nullable: true })
    ratingCount: number | null;

    @ApiProperty({ description: "Product description / features", nullable: true })
    aboutProduct: string | null;

    @ApiProperty({ description: "Product reviews", type: [ReviewSummaryDto] })
    reviews: ReviewSummaryDto[];

    @ApiProperty({ description: "Record creation timestamp" })
    createdAt: Date;

    @ApiProperty({ description: "Record last update timestamp" })
    updatedAt: Date;
}
