"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportController = void 0;
const _business_core_dto_1 = require("../../../libs/@oc/business-core/dto");
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _core_custom_decorators_1 = require("../../../libs/@oc/server-core/custom-decorators");
const _core_custom_guards_1 = require("../../../libs/@oc/server-core/custom-guards");
const _core_enums_1 = require("../../../libs/@oc/server-core/enums");
const _core_utilities_1 = require("../../../libs/@oc/server-core/utilities");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const IMPORT_MODULE_NAME = (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.IMPORT);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
let ImportController = class ImportController {
    constructor(importService) {
        this.importService = importService;
    }
    importProducts(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file) {
                throw new common_1.BadRequestException({ message: "ERR_IMPORT_FILE_REQUIRED" });
            }
            return this.importService.importProducts(file);
        });
    }
    getHistory() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10) {
            return this.importService.getImportHistory(pageNumber, pageSize);
        });
    }
};
exports.ImportController = ImportController;
__decorate([
    (0, common_1.Post)("products"),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: { type: "string", format: "binary", description: "CSV, XLS, or XLSX file" }
            },
            required: ["file"]
        }
    }),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Upload and import product/review dataset from CSV or Excel", [common_1.HttpStatus.CREATED, common_1.HttpStatus.BAD_REQUEST], IMPORT_MODULE_NAME, _business_core_modules_1.ImportHistoryResponseDto),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: MAX_FILE_SIZE_BYTES },
        fileFilter: (_req, file, cb) => {
            const ext = file.originalname.toLowerCase().split(".").pop();
            if (["csv", "xls", "xlsx"].includes(ext !== null && ext !== void 0 ? ext : "")) {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException({ message: "ERR_UNSUPPORTED_FILE_FORMAT" }), false);
            }
        }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "importProducts", null);
__decorate([
    (0, common_1.Get)("history"),
    (0, swagger_1.ApiQuery)({ name: "pageNumber", required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: "pageSize", required: false, example: 10 }),
    (0, _core_custom_decorators_1.ApiResponseStatus)("List previous import operations", [common_1.HttpStatus.OK], IMPORT_MODULE_NAME, _business_core_dto_1.CommonSearchResponseDto, _business_core_modules_1.ImportHistoryResponseDto),
    __param(0, (0, common_1.Query)("pageNumber", new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)("pageSize", new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "getHistory", null);
exports.ImportController = ImportController = __decorate([
    (0, swagger_1.ApiTags)("Import"),
    (0, common_1.Controller)("import"),
    (0, common_1.UseGuards)(_core_custom_guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [_business_core_modules_1.ImportService])
], ImportController);
//# sourceMappingURL=import.controller.js.map