export declare class CommonSearchResponseDto<T = any> {
    constructor(result: T[], pageSize: number, page: number, resultCount: number);
    results: T[];
    pageSize: number;
    page: number;
    totalCount: number;
}
