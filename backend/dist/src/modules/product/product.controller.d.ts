import { AppResponse, CommonSearchResponseDto } from "../../../libs/@oc/business-core/dto";
import { ListProductRequestDto, ProductResponseDto, ProductService } from "../../../libs/@oc/business-core/modules";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(query: ListProductRequestDto): Promise<AppResponse<CommonSearchResponseDto<ProductResponseDto>>>;
    findOne(id: string): Promise<AppResponse<ProductResponseDto>>;
}
