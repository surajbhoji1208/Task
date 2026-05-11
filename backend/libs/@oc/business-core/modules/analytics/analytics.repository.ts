import { Product, Review } from "@core-database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AnalyticsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Review)
        private readonly reviewRepo: Repository<Review>
    ) {}

    async getProductsPerCategory(): Promise<any[]> {
        return this.productRepo
            .createQueryBuilder("product")
            .select("category.name", "category_name")
            .addSelect("COUNT(product.id)", "product_count")
            .innerJoin("product.category", "category")
            .groupBy("category.id")
            .addGroupBy("category.name")
            .orderBy("product_count", "DESC")
            .getRawMany();
    }

    async getTopReviewedProducts(limit: number): Promise<any[]> {
        return this.productRepo
            .createQueryBuilder("product")
            .select([
                "product.id",
                "product.externalProductId",
                "product.productName",
                "product.rating",
                "product.ratingCount",
                "product.discountedPrice"
            ])
            .leftJoin("product.category", "category")
            .addSelect("category.name")
            .where("product.ratingCount IS NOT NULL")
            .orderBy("product.ratingCount", "DESC")
            .addOrderBy("product.rating", "DESC")
            .limit(limit)
            .getRawMany();
    }

    async getDiscountDistribution(): Promise<any[]> {
        return this.productRepo
            .createQueryBuilder("product")
            .select(
                `CASE
                    WHEN product.discount_percentage < 0.25 THEN '0%-25%'
                    WHEN product.discount_percentage < 0.50 THEN '25%-50%'
                    WHEN product.discount_percentage < 0.75 THEN '50%-75%'
                    ELSE '75%-100%'
                END`,
                "discount_range"
            )
            .addSelect("COUNT(product.id)", "product_count")
            .addSelect("AVG(product.rating)", "avg_rating")
            .where("product.discountPercentage IS NOT NULL")
            .groupBy(
                `CASE
                    WHEN product.discount_percentage < 0.25 THEN '0%-25%'
                    WHEN product.discount_percentage < 0.50 THEN '25%-50%'
                    WHEN product.discount_percentage < 0.75 THEN '50%-75%'
                    ELSE '75%-100%'
                END`
            )
            .orderBy("discount_range", "ASC")
            .getRawMany();
    }

    async getCategoryAvgRating(): Promise<any[]> {
        return this.productRepo
            .createQueryBuilder("product")
            .select("category.name", "category_name")
            .addSelect("AVG(product.rating)", "avg_rating")
            .addSelect("COUNT(product.id)", "product_count")
            .addSelect("SUM(product.ratingCount)", "total_ratings")
            .innerJoin("product.category", "category")
            .where("product.rating IS NOT NULL")
            .groupBy("category.id")
            .addGroupBy("category.name")
            .orderBy("avg_rating", "DESC")
            .getRawMany();
    }

    async getReviewEngagementMetrics(): Promise<any> {
        const productMetrics = await this.productRepo
            .createQueryBuilder("product")
            .select("COUNT(product.id)", "total_products")
            .addSelect("SUM(product.ratingCount)", "total_ratings")
            .addSelect("AVG(product.rating)", "avg_rating")
            .addSelect("MAX(product.ratingCount)", "max_rating_count")
            .addSelect("MIN(product.ratingCount)", "min_rating_count")
            .where("product.ratingCount IS NOT NULL")
            .getRawOne();

        const totalReviews = await this.reviewRepo.count();

        const totalProducts = Number(productMetrics.total_products) || 0;

        return {
            total_products: totalProducts,
            total_reviews: totalReviews,
            avg_reviews_per_product: totalProducts > 0 ? totalReviews / totalProducts : null,
            total_ratings: productMetrics.total_ratings,
            avg_rating: productMetrics.avg_rating,
            max_rating_count: productMetrics.max_rating_count,
            min_rating_count: productMetrics.min_rating_count
        };
    }
}
