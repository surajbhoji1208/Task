import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { Category } from "./category.entity";
import { Review } from "./review.entity";
export declare class Product extends BaseModifiableEntityWithoutIdentity {
    id: string;
    externalProductId: string;
    productName: string;
    categoryId: string | null;
    categoryPath: string | null;
    discountedPrice: number | null;
    actualPrice: number | null;
    discountPercentage: number | null;
    rating: number | null;
    ratingCount: number | null;
    aboutProduct: string | null;
    category: Category;
    reviews: Review[];
}
