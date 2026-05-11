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
exports.ImportHistoryResponseDto = void 0;
const _core_enums_1 = require("../../../../../server-core/enums");
const swagger_1 = require("@nestjs/swagger");
class ImportHistoryResponseDto {
    constructor(history) {
        this.id = history.id;
        this.fileName = history.fileName;
        this.totalRecords = history.totalRecords;
        this.importedRecords = history.importedRecords;
        this.skippedRecords = history.skippedRecords;
        this.failedRecords = history.failedRecords;
        this.status = history.status;
        this.errorMessage = history.errorMessage;
        this.createdAt = history.createdAt;
        this.updatedAt = history.updatedAt;
    }
}
exports.ImportHistoryResponseDto = ImportHistoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Import history unique identifier" }),
    __metadata("design:type", String)
], ImportHistoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Uploaded file name" }),
    __metadata("design:type", String)
], ImportHistoryResponseDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total records parsed from the file" }),
    __metadata("design:type", Number)
], ImportHistoryResponseDto.prototype, "totalRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Records successfully imported" }),
    __metadata("design:type", Number)
], ImportHistoryResponseDto.prototype, "importedRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Records skipped (already exist, updated)" }),
    __metadata("design:type", Number)
], ImportHistoryResponseDto.prototype, "skippedRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Records that failed to import due to validation errors" }),
    __metadata("design:type", Number)
], ImportHistoryResponseDto.prototype, "failedRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Import status", enum: _core_enums_1.ImportStatusEnum }),
    __metadata("design:type", String)
], ImportHistoryResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error message if import failed", nullable: true }),
    __metadata("design:type", String)
], ImportHistoryResponseDto.prototype, "errorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Import started at" }),
    __metadata("design:type", Date)
], ImportHistoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Import completed at" }),
    __metadata("design:type", Date)
], ImportHistoryResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=import-history.response.dto.js.map