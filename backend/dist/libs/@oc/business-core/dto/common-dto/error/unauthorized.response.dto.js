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
exports.UnauthorizedResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DeveloperError {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Access token not found",
        description: "Error key"
    }),
    __metadata("design:type", String)
], DeveloperError.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ui",
        description: "Error type"
    }),
    __metadata("design:type", String)
], DeveloperError.prototype, "errorType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Access token not found",
        description: "Actual error message"
    }),
    __metadata("design:type", String)
], DeveloperError.prototype, "actualError", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Access token not found",
        description: "User-friendly display error"
    }),
    __metadata("design:type", String)
], DeveloperError.prototype, "displayError", void 0);
class UnauthorizedResponseDto {
}
exports.UnauthorizedResponseDto = UnauthorizedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Access token not found",
        description: "Error message"
    }),
    __metadata("design:type", String)
], UnauthorizedResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [DeveloperError],
        description: "Array of developer error details"
    }),
    __metadata("design:type", Array)
], UnauthorizedResponseDto.prototype, "developerErrors", void 0);
//# sourceMappingURL=unauthorized.response.dto.js.map