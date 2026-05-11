import { Product } from "../../../server-core/database";
import { Repository } from "typeorm";
import { ListProductRequestDto } from "./dto/request/list-product.request.dto";
export declare class ProductRepository extends Repository<Product> {
    constructor(repository: Repository<Product>);
    findProducts(searchRequest: ListProductRequestDto): Promise<[Product[], number]>;
    findById(id: string): Promise<Product | null>;
    findByExternalId(externalProductId: string): Promise<Product | null>;
}
