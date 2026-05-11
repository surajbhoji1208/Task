import { AppResponse, CommonSearchResponseDto } from "@business-core-dto";
import { ImportHistoryResponseDto, ImportService } from "@business-core-modules";
import { ApiResponseStatus } from "@core-custom-decorators";
import { JwtAuthGuard } from "@core-custom-guards";
import { ModuleName } from "@core-enums";
import { MapToModuleName } from "@core-utilities";
import {
    BadRequestException,
    Controller,
    Get,
    HttpStatus,
    ParseIntPipe,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { memoryStorage } from "multer";

const IMPORT_MODULE_NAME = MapToModuleName(ModuleName.IMPORT);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

@ApiTags("Import")
@Controller("import")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ImportController {
    constructor(private readonly importService: ImportService) {}

    @Post("products")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: { type: "string", format: "binary", description: "CSV, XLS, or XLSX file" }
            },
            required: ["file"]
        }
    })
    @ApiResponseStatus(
        "Upload and import product/review dataset from CSV or Excel",
        [HttpStatus.CREATED, HttpStatus.BAD_REQUEST],
        IMPORT_MODULE_NAME,
        ImportHistoryResponseDto
    )
    @UseInterceptors(
        FileInterceptor("file", {
            storage: memoryStorage(),
            limits: { fileSize: MAX_FILE_SIZE_BYTES },
            fileFilter: (_req, file, cb) => {
                const ext = file.originalname.toLowerCase().split(".").pop();
                if (["csv", "xls", "xlsx"].includes(ext ?? "")) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException({ message: "ERR_UNSUPPORTED_FILE_FORMAT" }), false);
                }
            }
        })
    )
    async importProducts(
        @UploadedFile() file: Express.Multer.File
    ): Promise<AppResponse<ImportHistoryResponseDto>> {
        if (!file) {
            throw new BadRequestException({ message: "ERR_IMPORT_FILE_REQUIRED" });
        }
        return this.importService.importProducts(file);
    }

    @Get("history")
    @ApiQuery({ name: "pageNumber", required: false, example: 1 })
    @ApiQuery({ name: "pageSize", required: false, example: 10 })
    @ApiResponseStatus(
        "List previous import operations",
        [HttpStatus.OK],
        IMPORT_MODULE_NAME,
        CommonSearchResponseDto,
        ImportHistoryResponseDto
    )
    async getHistory(
        @Query("pageNumber", new ParseIntPipe({ optional: true })) pageNumber: number = 1,
        @Query("pageSize", new ParseIntPipe({ optional: true })) pageSize: number = 10
    ): Promise<AppResponse<CommonSearchResponseDto<ImportHistoryResponseDto>>> {
        return this.importService.getImportHistory(pageNumber, pageSize);
    }
}
