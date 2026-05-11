export declare class AuditContextService {
    private userId;
    setUserId(userId: string): void;
    getUserId(): string;
}
export declare class AuditContext {
    private static userId;
    static setUserId(userId: string): void;
    static getUserId(): string;
    static clear(): void;
}
