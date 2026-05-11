export interface ProfilerContext {
    cacheHits: number;
    cacheMisses: number;
}
export interface ApiProfile {
    endpoint: string;
    method: string;
    path: string;
    totalCalls: number;
    totalResponseTime: number;
    averageResponseTime: number;
    p95ResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
    lastCallAt: Date;
    errorCount: number;
    cacheHitCount: number;
    cacheMissCount: number;
    recentLatencies?: number[];
}
export declare class ProfilerService {
    #private;
    private readonly profiles;
    private readonly MAX_HISTORY;
    private readonly storage;
    runWithContext<T>(fn: () => T | Promise<T>): T | Promise<T>;
    enterWithContext(): void;
    recordCacheHit(): void;
    recordCacheMiss(): void;
    recordProfile(endpoint: string, method: string, path: string, responseTime: number, isError?: boolean, cacheHits?: number, cacheMisses?: number): void;
    getAllProfiles(): ApiProfile[];
    getProfile(endpoint: string): Omit<ApiProfile, 'recentLatencies'> | undefined;
    getSummary(): {
        totalEndpoints: number;
        totalCalls: number;
        totalCacheHits: number;
        totalCacheMisses: number;
        averageResponseTime: number;
        slowestEndpoint: Omit<ApiProfile, 'recentLatencies'> | null;
        fastestEndpoint: Omit<ApiProfile, 'recentLatencies'> | null;
    };
    clearAllProfiles(): void;
    getContext(): ProfilerContext | undefined;
    getHighErrorRateEndpoints(): ApiProfile[];
    getSlowEndpoints(): ApiProfile[];
}
