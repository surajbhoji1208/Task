import { Product, Review } from "../../../server-core/database";
import { Repository } from "typeorm";
export declare class AnalyticsRepository {
    private readonly productRepo;
    private readonly reviewRepo;
    constructor(productRepo: Repository<Product>, reviewRepo: Repository<Review>);
    getProductsPerCategory(): Promise<any[]>;
    getTopReviewedProducts(limit: number): Promise<any[]>;
    getDiscountDistribution(): Promise<any[]>;
    getCategoryAvgRating(): Promise<any[]>;
    getReviewEngagementMetrics(): Promise<any>;
}
