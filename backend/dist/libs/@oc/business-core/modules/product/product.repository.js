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
exports.ProductRepository = void 0;
const _core_database_1 = require("../../../server-core/database");
const _core_enums_1 = require("../../../server-core/enums");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProductRepository = class ProductRepository extends typeorm_2.Repository {
    constructor(repository) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    findProducts(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const qb = this.createQueryBuilder("product")
                .select([
                "product.id",
                "product.externalProductId",
                "product.productName",
                "product.categoryId",
                "product.categoryPath",
                "product.discountedPrice",
                "product.actualPrice",
                "product.discountPercentage",
                "product.rating",
                "product.ratingCount",
                "product.createdAt",
                "product.updatedAt"
            ])
                .leftJoin("product.category", "category")
                .addSelect(["category.id", "category.name"]);
            if (searchRequest.category) {
                qb.andWhere("category.name ILIKE :category", { category: `%${searchRequest.category}%` });
            }
            if (searchRequest.minRating != null) {
                qb.andWhere("product.rating >= :minRating", { minRating: searchRequest.minRating });
            }
            if (searchRequest.minReviewCount != null) {
                qb.andWhere("product.ratingCount >= :minReviewCount", { minReviewCount: searchRequest.minReviewCount });
            }
            if (searchRequest.searchText) {
                qb.andWhere("product.productName ILIKE :q", { q: `%${searchRequest.searchText}%` });
            }
            const SORT_MAP = {
                productName: "product.productName",
                rating: "product.rating",
                ratingCount: "product.ratingCount",
                discountedPrice: "product.discountedPrice",
                actualPrice: "product.actualPrice",
                discountPercentage: "product.discountPercentage",
                createdAt: "product.createdAt",
                updatedAt: "product.updatedAt"
            };
            const orderByField = (_b = SORT_MAP[(_a = searchRequest.sortBy) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "product.ratingCount";
            const orderDirection = searchRequest.sortDirection === _core_enums_1.SortDirection.ASC ? _core_enums_1.SortDirection.ASC : _core_enums_1.SortDirection.DESC;
            qb.orderBy(orderByField, orderDirection);
            const pageSize = searchRequest.pageSize || 10;
            const pageNumber = searchRequest.pageNumber || 1;
            if (!(pageNumber === 0 && pageSize === 0)) {
                qb.skip((pageNumber - 1) * pageSize).take(pageSize);
            }
            return qb.getManyAndCount();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("product")
                .select([
                "product.id",
                "product.externalProductId",
                "product.productName",
                "product.categoryId",
                "product.categoryPath",
                "product.discountedPrice",
                "product.actualPrice",
                "product.discountPercentage",
                "product.rating",
                "product.ratingCount",
                "product.aboutProduct",
                "product.createdAt",
                "product.updatedAt"
            ])
                .leftJoin("product.category", "category")
                .addSelect(["category.id", "category.name"])
                .leftJoinAndSelect("product.reviews", "review")
                .andWhere("product.id = :id", { id })
                .getOne();
        });
    }
    findByExternalId(externalProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("product")
                .select(["product.id", "product.externalProductId", "product.categoryId"])
                .andWhere("product.externalProductId = :externalProductId", { externalProductId })
                .getOne();
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(_core_database_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map