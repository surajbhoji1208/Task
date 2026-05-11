import { AppResponse, CommonSearchResponseDto } from "@business-core-dto";
import { ListProductRequestDto, ProductResponseDto, ProductService } from "@business-core-modules";
import { ApiResponseStatus } from "@core-custom-decorators";
import { JwtAuthGuard } from "@core-custom-guards";
import { ModuleName } from "@core-enums";
import { MapToModuleName } from "@core-utilities";
import {
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Query,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";

const PRODUCT_MODULE_NAME = MapToModuleName(ModuleName.PRODUCT);

@ApiTags("Products")
@Controller("products")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiResponseStatus(
        "List products with pagination, search, filtering and sorting",
        [HttpStatus.OK, HttpStatus.BAD_REQUEST],
        PRODUCT_MODULE_NAME,
        CommonSearchResponseDto,
        ProductResponseDto
    )
    async findAll(
        @Query() query: ListProductRequestDto
    ): Promise<AppResponse<CommonSearchResponseDto<ProductResponseDto>>> {
        return this.productService.findList(query);
    }

    @Get(":id")
    @ApiParam({ name: "id", description: "Product UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
    @ApiResponseStatus(
        "Get product by UUID (includes reviews)",
        [HttpStatus.OK, HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
        PRODUCT_MODULE_NAME,
        ProductResponseDto
    )
    async findOne(
        @Param("id", ParseUUIDPipe) id: string
    ): Promise<AppResponse<ProductResponseDto>> {
        return this.productService.findById(id);
    }
}
