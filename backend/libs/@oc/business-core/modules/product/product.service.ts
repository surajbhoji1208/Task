import { AppResponse, CommonSearchResponseDto } from "@business-core-dto";
import { MODULE_CONSTANTS, SuccessConstant } from "@core-constants";
import { ModuleName } from "@core-enums";
import { AppCacheService } from "@core-shared-modules";
import { GenerateLogPrefix, GetCacheKey, MapToModuleName } from "@core-utilities";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ListProductRequestDto } from "./dto/request/list-product.request.dto";
import { ProductResponseDto } from "./dto/response/product.response.dto";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
    readonly #logger: Logger = new Logger(ProductService.name);
    private readonly PRODUCT_CACHE_MODULE = MODULE_CONSTANTS.PRODUCT;

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly appCacheService: AppCacheService
    ) {}

    async findList(
        searchRequest: ListProductRequestDto
    ): Promise<AppResponse<CommonSearchResponseDto<ProductResponseDto>>> {
        const logPrefix = GenerateLogPrefix(this.findList.name);
        const cacheKey = GetCacheKey(this.PRODUCT_CACHE_MODULE, "list", true, searchRequest);

        this.#logger.debug(`${logPrefix} : Finding products list`);

        const cached = await this.appCacheService.get<CommonSearchResponseDto<ProductResponseDto>>(cacheKey);
        if (cached) {
            this.#logger.debug(`${logPrefix} : Products list served from cache`);
            return new AppResponse(SuccessConstant.ListFetch, cached, {
                module: MapToModuleName(ModuleName.PRODUCT)
            });
        }

        const [products, total] = await this.productRepository.findProducts(searchRequest);

        const dtos = products.map((p) => new ProductResponseDto(p));
        const response = new CommonSearchResponseDto(
            dtos,
            searchRequest.pageSize || 10,
            searchRequest.pageNumber || 1,
            total
        );

        await this.appCacheService.set(cacheKey, response, 60, { module: this.PRODUCT_CACHE_MODULE });

        this.#logger.debug(`${logPrefix} : Products list fetched and cached`);

        return new AppResponse(SuccessConstant.ListFetch, response, {
            module: MapToModuleName(ModuleName.PRODUCT)
        });
    }

    async findById(id: string): Promise<AppResponse<ProductResponseDto>> {
        const logPrefix = GenerateLogPrefix(this.findById.name);

        this.#logger.debug(`${logPrefix} : Finding product by ID: ${id}`);

        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException({
                message: "ERR_MODULE_NOT_FOUND",
                module: MapToModuleName(ModuleName.PRODUCT)
            });
        }

        this.#logger.debug(`${logPrefix} : Product found`);

        return new AppResponse(SuccessConstant.DetailFetch, new ProductResponseDto(product), {
            module: MapToModuleName(ModuleName.PRODUCT)
        });
    }

    async invalidateCache(): Promise<void> {
        await this.appCacheService.clearListCachesByModule(this.PRODUCT_CACHE_MODULE);
    }
}
