import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { Product } from "./product.entity";
export declare class Review extends BaseModifiableEntityWithoutIdentity {
    id: string;
    productId: string;
    userName: string | null;
    reviewTitle: string | null;
    reviewContent: string | null;
    product: Product;
}
