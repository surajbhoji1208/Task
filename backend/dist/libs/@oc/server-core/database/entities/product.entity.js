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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const _core_constants_1 = require("../../constants");
const typeorm_1 = require("typeorm");
const base_modifiable_without_identity_entity_1 = require("../base-entities/base-modifiable-without-identity-entity");
const category_entity_1 = require("./category.entity");
const review_entity_1 = require("./review.entity");
let Product = class Product extends base_modifiable_without_identity_entity_1.BaseModifiableEntityWithoutIdentity {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)("IDX_PRODUCT_EXTERNAL_ID"),
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ProductEntityConstant.ExternalIdMaxLength,
        name: "external_product_id",
        nullable: false
    }),
    __metadata("design:type", String)
], Product.prototype, "externalProductId", void 0);
__decorate([
    (0, typeorm_1.Index)("IDX_PRODUCT_NAME"),
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ProductEntityConstant.NameMaxLength,
        name: "product_name",
        nullable: false
    }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", name: "category_id", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ProductEntityConstant.CategoryPathMaxLength,
        name: "category_path",
        nullable: true
    }),
    __metadata("design:type", String)
], Product.prototype, "categoryPath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 12,
        scale: 2,
        name: "discounted_price",
        nullable: true
    }),
    __metadata("design:type", Number)
], Product.prototype, "discountedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 12,
        scale: 2,
        name: "actual_price",
        nullable: true
    }),
    __metadata("design:type", Number)
], Product.prototype, "actualPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 5,
        scale: 4,
        name: "discount_percentage",
        nullable: true
    }),
    __metadata("design:type", Number)
], Product.prototype, "discountPercentage", void 0);
__decorate([
    (0, typeorm_1.Index)("IDX_PRODUCT_RATING"),
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 3,
        scale: 1,
        name: "rating",
        nullable: true
    }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Index)("IDX_PRODUCT_RATING_COUNT"),
    (0, typeorm_1.Column)({
        type: "integer",
        name: "rating_count",
        nullable: true
    }),
    __metadata("design:type", Number)
], Product.prototype, "ratingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        name: "about_product",
        nullable: true
    }),
    __metadata("design:type", String)
], Product.prototype, "aboutProduct", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.products, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)("product"),
    (0, typeorm_1.Unique)(_core_constants_1.DatabaseUniqueKey.ProductExternalId, ["externalProductId"])
], Product);
//# sourceMappingURL=product.entity.js.map