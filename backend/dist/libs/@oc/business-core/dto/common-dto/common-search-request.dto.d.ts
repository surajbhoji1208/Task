import { SortDirection } from "../../../server-core/enums";
export declare class CommonSearchRequestDto {
    searchText?: string;
    pageSize?: number;
    pageNumber?: number;
    sortDirection?: SortDirection;
}
