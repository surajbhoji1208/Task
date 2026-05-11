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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _ProductService_logger;
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const _business_core_dto_1 = require("../../dto");
const _core_constants_1 = require("../../../server-core/constants");
const _core_enums_1 = require("../../../server-core/enums");
const _core_shared_modules_1 = require("../../../server-core/shared-modules");
const _core_utilities_1 = require("../../../server-core/utilities");
const common_1 = require("@nestjs/common");
const product_response_dto_1 = require("./dto/response/product.response.dto");
const product_repository_1 = require("./product.repository");
let ProductService = ProductService_1 = _a = class ProductService {
    constructor(productRepository, appCacheService) {
        this.productRepository = productRepository;
        this.appCacheService = appCacheService;
        _ProductService_logger.set(this, new common_1.Logger(ProductService_1.name));
        this.PRODUCT_CACHE_MODULE = _core_constants_1.MODULE_CONSTANTS.PRODUCT;
    }
    findList(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.findList.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.PRODUCT_CACHE_MODULE, "list", true, searchRequest);
            __classPrivateFieldGet(this, _ProductService_logger, "f").debug(`${logPrefix} : Finding products list`);
            const cached = yield this.appCacheService.get(cacheKey);
            if (cached) {
                __classPrivateFieldGet(this, _ProductService_logger, "f").debug(`${logPrefix} : Products list served from cache`);
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, cached, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.PRODUCT)
                });
            }
            const [products, total] = yield this.productRepository.findProducts(searchRequest);
            const dtos = products.map((p) => new product_response_dto_1.ProductResponseDto(p));
            const response = new _business_core_dto_1.CommonSearchResponseDto(dtos, searchRequest.pageSize || 10, searchRequest.pageNumber || 1, total);
            yield this.appCacheService.set(cacheKey, response, 60, { module: this.PRODUCT_CACHE_MODULE });
            __classPrivateFieldGet(this, _ProductService_logger, "f").debug(`${logPrefix} : Products list fetched and cached`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, response, {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.PRODUCT)
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.findById.name);
            __classPrivateFieldGet(this, _ProductService_logger, "f").debug(`${logPrefix} : Finding product by ID: ${id}`);
            const product = yield this.productRepository.findById(id);
            if (!product) {
                throw new common_1.NotFoundException({
                    message: "ERR_MODULE_NOT_FOUND",
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.PRODUCT)
                });
            }
            __classPrivateFieldGet(this, _ProductService_logger, "f").debug(`${logPrefix} : Product found`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.DetailFetch, new product_response_dto_1.ProductResponseDto(product), {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.PRODUCT)
            });
        });
    }
    invalidateCache() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.appCacheService.clearListCachesByModule(this.PRODUCT_CACHE_MODULE);
        });
    }
};
exports.ProductService = ProductService;
_ProductService_logger = new WeakMap();
exports.ProductService = ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        _core_shared_modules_1.AppCacheService])
], ProductService);
//# sourceMappingURL=product.service.js.map