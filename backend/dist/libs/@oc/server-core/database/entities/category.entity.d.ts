import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { Product } from "./product.entity";
export declare class Category extends BaseModifiableEntityWithoutIdentity {
    id: string;
    name: string;
    products: Product[];
}
