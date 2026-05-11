declare class DeveloperError {
    key: string;
    errorType: string;
    actualError: string;
    displayError: string;
}
export declare class UnauthorizedResponseDto {
    message: string;
    developerErrors: DeveloperError[];
}
export {};
