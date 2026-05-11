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
exports.ImportHistory = void 0;
const _core_constants_1 = require("../../constants");
const _core_enums_1 = require("../../enums");
const typeorm_1 = require("typeorm");
const base_modifiable_without_identity_entity_1 = require("../base-entities/base-modifiable-without-identity-entity");
let ImportHistory = class ImportHistory extends base_modifiable_without_identity_entity_1.BaseModifiableEntityWithoutIdentity {
};
exports.ImportHistory = ImportHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ImportHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ImportHistoryEntityConstant.FileNameMaxLength,
        name: "file_name",
        nullable: false
    }),
    __metadata("design:type", String)
], ImportHistory.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "total_records", nullable: false, default: 0 }),
    __metadata("design:type", Number)
], ImportHistory.prototype, "totalRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "imported_records", nullable: false, default: 0 }),
    __metadata("design:type", Number)
], ImportHistory.prototype, "importedRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "skipped_records", nullable: false, default: 0 }),
    __metadata("design:type", Number)
], ImportHistory.prototype, "skippedRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "failed_records", nullable: false, default: 0 }),
    __metadata("design:type", Number)
], ImportHistory.prototype, "failedRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: _core_enums_1.ImportStatusEnum,
        name: "status",
        nullable: false,
        default: _core_enums_1.ImportStatusEnum.PROCESSING
    }),
    __metadata("design:type", String)
], ImportHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: _core_constants_1.ImportHistoryEntityConstant.ErrorMessageMaxLength,
        name: "error_message",
        nullable: true
    }),
    __metadata("design:type", String)
], ImportHistory.prototype, "errorMessage", void 0);
exports.ImportHistory = ImportHistory = __decorate([
    (0, typeorm_1.Entity)("import_history")
], ImportHistory);
//# sourceMappingURL=import-history.entity.js.map