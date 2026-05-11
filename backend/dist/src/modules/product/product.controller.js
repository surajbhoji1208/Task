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
exports.ProductController = void 0;
const _business_core_dto_1 = require("../../../libs/@oc/business-core/dto");
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _core_custom_decorators_1 = require("../../../libs/@oc/server-core/custom-decorators");
const _core_custom_guards_1 = require("../../../libs/@oc/server-core/custom-guards");
const _core_enums_1 = require("../../../libs/@oc/server-core/enums");
const _core_utilities_1 = require("../../../libs/@oc/server-core/utilities");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const PRODUCT_MODULE_NAME = (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.PRODUCT);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.findList(query);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.findById(id);
        });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    (0, _core_custom_decorators_1.ApiResponseStatus)("List products with pagination, search, filtering and sorting", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST], PRODUCT_MODULE_NAME, _business_core_dto_1.CommonSearchResponseDto, _business_core_modules_1.ProductResponseDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.ListProductRequestDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product UUID", example: "123e4567-e89b-12d3-a456-426614174000" }),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Get product by UUID (includes reviews)", [common_1.HttpStatus.OK, common_1.HttpStatus.NOT_FOUND, common_1.HttpStatus.BAD_REQUEST], PRODUCT_MODULE_NAME, _business_core_modules_1.ProductResponseDto),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("Products"),
    (0, common_1.Controller)("products"),
    (0, common_1.UseGuards)(_core_custom_guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [_business_core_modules_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map