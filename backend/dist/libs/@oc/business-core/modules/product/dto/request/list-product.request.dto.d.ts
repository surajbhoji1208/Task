import { CommonSearchRequestDto } from "../../../../dto";
export declare class ListProductRequestDto extends CommonSearchRequestDto {
    category?: string;
    minRating?: number;
    minReviewCount?: number;
    sortBy?: string;
}
