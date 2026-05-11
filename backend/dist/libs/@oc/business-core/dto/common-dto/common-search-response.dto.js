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
exports.CommonSearchResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CommonSearchResponseDto {
    constructor(result, pageSize, page, resultCount) {
        this.results = result;
        this.page = page;
        this.pageSize = pageSize;
        this.totalCount = resultCount;
    }
}
exports.CommonSearchResponseDto = CommonSearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The result of the search query",
        type: () => Object,
        isArray: true
    }),
    __metadata("design:type", Array)
], CommonSearchResponseDto.prototype, "results", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The number of records per page",
        example: 10
    }),
    __metadata("design:type", Number)
], CommonSearchResponseDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The current page number",
        example: 1
    }),
    __metadata("design:type", Number)
], CommonSearchResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The total number of records for the search query",
        example: 100
    }),
    __metadata("design:type", Number)
], CommonSearchResponseDto.prototype, "totalCount", void 0);
//# sourceMappingURL=common-search-response.dto.js.map