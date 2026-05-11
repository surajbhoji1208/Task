import { ApiProperty } from "@nestjs/swagger";

export class ProductsPerCategoryDto {
    constructor(data: any) {
        this.categoryName = data.category_name;
        this.productCount = Number(data.product_count);
    }

    @ApiProperty({ description: "Category name" })
    categoryName: string;

    @ApiProperty({ description: "Number of products in this category" })
    productCount: number;
}

export class TopReviewedProductDto {
    constructor(data: any) {
        this.id = data.product_id;
        this.externalProductId = data.product_external_product_id;
        this.productName = data.product_product_name;
        this.categoryName = data.category_name ?? null;
        this.rating = data.product_rating != null ? Number(data.product_rating) : null;
        this.ratingCount = data.product_rating_count != null ? Number(data.product_rating_count) : null;
        this.discountedPrice = data.product_discounted_price != null ? Number(data.product_discounted_price) : null;
    }

    @ApiProperty({ description: "Product UUID" })
    id: string;

    @ApiProperty({ description: "External product ID" })
    externalProductId: string;

    @ApiProperty({ description: "Product name" })
    productName: string;

    @ApiProperty({ description: "Top-level category name", nullable: true })
    categoryName: string | null;

    @ApiProperty({ description: "Average rating", nullable: true })
    rating: number | null;

    @ApiProperty({ description: "Total rating / review count", nullable: true })
    ratingCount: number | null;

    @ApiProperty({ description: "Discounted price", nullable: true })
    discountedPrice: number | null;
}

export class DiscountBucketDto {
    constructor(data: any) {
        this.discountRange = data.discount_range;
        this.productCount = Number(data.product_count);
        this.avgRating = data.avg_rating != null ? Number(Number(data.avg_rating).toFixed(2)) : null;
    }

    @ApiProperty({ description: "Discount percentage range label", example: "50%-75%" })
    discountRange: string;

    @ApiProperty({ description: "Number of products in this discount range" })
    productCount: number;

    @ApiProperty({ description: "Average rating for products in this range", nullable: true })
    avgRating: number | null;
}

export class CategoryAvgRatingDto {
    constructor(data: any) {
        this.categoryName = data.category_name;
        this.avgRating = data.avg_rating != null ? Number(Number(data.avg_rating).toFixed(2)) : null;
        this.productCount = Number(data.product_count);
        this.totalRatings = data.total_ratings != null ? Number(data.total_ratings) : null;
    }

    @ApiProperty({ description: "Category name" })
    categoryName: string;

    @ApiProperty({ description: "Average rating across products in this category", nullable: true })
    avgRating: number | null;

    @ApiProperty({ description: "Number of products in this category" })
    productCount: number;

    @ApiProperty({ description: "Sum of all rating counts in this category", nullable: true })
    totalRatings: number | null;
}

export class ReviewEngagementDto {
    constructor(data: any) {
        this.totalProducts = Number(data.total_products);
        this.totalReviews = Number(data.total_reviews);
        this.avgReviewsPerProduct = data.avg_reviews_per_product != null
            ? Number(Number(data.avg_reviews_per_product).toFixed(2))
            : null;
        this.totalRatings = data.total_ratings != null ? Number(data.total_ratings) : null;
        this.avgRating = data.avg_rating != null ? Number(Number(data.avg_rating).toFixed(2)) : null;
        this.maxRatingCount = data.max_rating_count != null ? Number(data.max_rating_count) : null;
        this.minRatingCount = data.min_rating_count != null ? Number(data.min_rating_count) : null;
    }

    @ApiProperty({ description: "Total number of products" })
    totalProducts: number;

    @ApiProperty({ description: "Total number of review records" })
    totalReviews: number;

    @ApiProperty({ description: "Average reviews per product", nullable: true })
    avgReviewsPerProduct: number | null;

    @ApiProperty({ description: "Sum of all product rating counts", nullable: true })
    totalRatings: number | null;

    @ApiProperty({ description: "Overall average rating across all products", nullable: true })
    avgRating: number | null;

    @ApiProperty({ description: "Maximum rating count for a single product", nullable: true })
    maxRatingCount: number | null;

    @ApiProperty({ description: "Minimum rating count for a single product", nullable: true })
    minRatingCount: number | null;
}
