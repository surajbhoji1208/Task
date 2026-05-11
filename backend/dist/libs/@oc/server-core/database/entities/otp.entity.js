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
exports.Otp = void 0;
const _core_enums_1 = require("../../enums");
const typeorm_1 = require("typeorm");
const base_modifiable_entity_1 = require("../base-entities/base-modifiable-entity");
const user_entity_1 = require("./user.entity");
let Otp = class Otp extends base_modifiable_entity_1.BaseModifiableEntity {
};
exports.Otp = Otp;
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 6,
        name: "otp_code",
        nullable: false
    }),
    __metadata("design:type", String)
], Otp.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: _core_enums_1.OtpType,
        name: "otp_type",
        nullable: false
    }),
    __metadata("design:type", Number)
], Otp.prototype, "otpType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        name: "expire_at",
        nullable: false
    }),
    __metadata("design:type", Date)
], Otp.prototype, "expireAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: "is_used",
        nullable: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], Otp.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "user_id",
        nullable: false
    }),
    __metadata("design:type", String)
], Otp.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Otp.prototype, "user", void 0);
exports.Otp = Otp = __decorate([
    (0, typeorm_1.Entity)("otp")
], Otp);
//# sourceMappingURL=otp.entity.js.map