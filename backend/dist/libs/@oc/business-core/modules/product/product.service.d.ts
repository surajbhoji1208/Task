import { AppResponse, CommonSearchResponseDto } from "../../dto";
import { AppCacheService } from "../../../server-core/shared-modules";
import { ListProductRequestDto } from "./dto/request/list-product.request.dto";
import { ProductResponseDto } from "./dto/response/product.response.dto";
import { ProductRepository } from "./product.repository";
export declare class ProductService {
    #private;
    private readonly productRepository;
    private readonly appCacheService;
    private readonly PRODUCT_CACHE_MODULE;
    constructor(productRepository: ProductRepository, appCacheService: AppCacheService);
    findList(searchRequest: ListProductRequestDto): Promise<AppResponse<CommonSearchResponseDto<ProductResponseDto>>>;
    findById(id: string): Promise<AppResponse<ProductResponseDto>>;
    invalidateCache(): Promise<void>;
}
