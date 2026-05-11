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
exports.BaseModifiableEntity = void 0;
const typeorm_1 = require("typeorm");
const identity_1 = require("./identity");
class BaseModifiableEntity extends identity_1.Identity {
}
exports.BaseModifiableEntity = BaseModifiableEntity;
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", name: "created_by", nullable: true }),
    __metadata("design:type", String)
], BaseModifiableEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", name: "updated_by", nullable: true }),
    __metadata("design:type", String)
], BaseModifiableEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", name: "deleted_by", nullable: true }),
    __metadata("design:type", String)
], BaseModifiableEntity.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp with time zone",
        name: "created_at",
        nullable: true
    }),
    __metadata("design:type", Date)
], BaseModifiableEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp with time zone",
        name: "updated_at",
        nullable: true
    }),
    __metadata("design:type", Date)
], BaseModifiableEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: "timestamp with time zone",
        name: "deleted_at",
        nullable: true
    }),
    __metadata("design:type", Date)
], BaseModifiableEntity.prototype, "deletedAt", void 0);
//# sourceMappingURL=base-modifiable-entity.js.map