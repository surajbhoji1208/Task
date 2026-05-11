"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const _core_constants_1 = require("../../constants");
const _core_enums_1 = require("../../enums");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("typeorm");
const base_modifiable_without_identity_entity_1 = require("../base-entities/base-modifiable-without-identity-entity");
let User = class User extends base_modifiable_without_identity_entity_1.BaseModifiableEntityWithoutIdentity {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.password) {
                this.salt = yield bcrypt.genSalt(10);
                this.password = yield bcrypt.hash(this.password, this.salt);
            }
        });
    }
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.password || !this.salt) {
                return false;
            }
            const hash = yield bcrypt.hash(password, this.salt);
            return hash === this.password;
        });
    }
    updatePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            this.salt = yield bcrypt.genSalt(10);
            this.password = yield bcrypt.hash(newPassword, this.salt);
        });
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.UserEntityConstant.FirstNameMaxLength,
        name: "first_name",
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.UserEntityConstant.LastNameMaxLength,
        name: "last_name",
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.UserEntityConstant.EmailMaxLength,
        name: "email",
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.UserEntityConstant.EncryptedPasswordMaxLength,
        name: "password",
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.UserEntityConstant.SaltMaxLength,
        name: "salt",
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.UserEntityConstant.PhoneNumberMaxLength,
        name: "phone_number",
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date",
        name: "date_of_birth",
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: _core_enums_1.UserTypeEnum,
        name: "user_type",
        nullable: false,
        default: _core_enums_1.UserTypeEnum.USER
    }),
    __metadata("design:type", Number)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: _core_enums_1.UserStatus,
        name: "status",
        nullable: false,
        default: _core_enums_1.UserStatus.ACTIVE
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user"),
    (0, typeorm_1.Unique)(_core_constants_1.DatabaseUniqueKey.UserEmailUserType, ["email", "userType", "deletedAt"])
], User);
//# sourceMappingURL=user.entity.js.map