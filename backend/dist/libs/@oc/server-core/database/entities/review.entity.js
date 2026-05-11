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
exports.Review = void 0;
const _core_constants_1 = require("../../constants");
const typeorm_1 = require("typeorm");
const base_modifiable_without_identity_entity_1 = require("../base-entities/base-modifiable-without-identity-entity");
const product_entity_1 = require("./product.entity");
let Review = class Review extends base_modifiable_without_identity_entity_1.BaseModifiableEntityWithoutIdentity {
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)("IDX_REVIEW_PRODUCT_ID"),
    (0, typeorm_1.Column)({ type: "uuid", name: "product_id", nullable: false }),
    __metadata("design:type", String)
], Review.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ReviewEntityConstant.UserNameMaxLength,
        name: "user_name",
        nullable: true
    }),
    __metadata("design:type", String)
], Review.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ReviewEntityConstant.ReviewTitleMaxLength,
        name: "review_title",
        nullable: true
    }),
    __metadata("design:type", String)
], Review.prototype, "reviewTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        name: "review_content",
        nullable: true
    }),
    __metadata("design:type", String)
], Review.prototype, "reviewContent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.reviews),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", product_entity_1.Product)
], Review.prototype, "product", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)("review"),
    (0, typeorm_1.Unique)(_core_constants_1.DatabaseUniqueKey.ReviewProductUserTitle, ["productId", "userName", "reviewTitle"])
], Review);
//# sourceMappingURL=review.entity.js.map