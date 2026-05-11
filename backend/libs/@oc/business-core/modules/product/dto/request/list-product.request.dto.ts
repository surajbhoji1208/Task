import { CommonSearchRequestDto } from "@business-core-dto";
import { ValidateMinValue, ValidateOptional, ValidateType } from "@core-custom-validators";
import { FieldTypeEnum } from "@core-enums";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ListProductRequestDto extends CommonSearchRequestDto {
    @ApiPropertyOptional({ description: "Filter by category name", example: "Electronics" })
    @ValidateOptional()
    @ValidateType({ constraints: { field: "category", type: FieldTypeEnum.String } })
    category?: string;

    @ApiPropertyOptional({ description: "Filter by minimum rating (1-5)", example: 4 })
    @ValidateOptional()
    @ValidateMinValue(1, { constraints: { field: "minRating" } })
    @ValidateType({ constraints: { field: "minRating", type: FieldTypeEnum.NumberString } })
    minRating?: number;

    @ApiPropertyOptional({ description: "Filter by minimum review count", example: 100 })
    @ValidateOptional()
    @ValidateMinValue(0, { constraints: { field: "minReviewCount" } })
    @ValidateType({ constraints: { field: "minReviewCount", type: FieldTypeEnum.NumberString } })
    minReviewCount?: number;

    @ApiPropertyOptional({
        description: "Sort by field",
        example: "rating",
        enum: ["productName", "rating", "ratingCount", "discountedPrice", "actualPrice", "discountPercentage", "createdAt"]
    })
    @ValidateOptional()
    @ValidateType({ constraints: { field: "sortBy", type: FieldTypeEnum.String } })
    sortBy?: string;
}
