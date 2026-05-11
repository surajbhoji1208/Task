import type { Cache } from "cache-manager";
import { ProfilerService } from "../profiler/app-profiler.service";
export declare class AppCacheService {
    #private;
    private readonly cache;
    private readonly profilingService;
    private readonly listCacheKeys;
    constructor(cache: Cache, profilingService: ProfilerService);
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T, ttl?: number, registerAsListCache?: {
        module: string;
    }): Promise<void>;
    del(key: string): Promise<void>;
    clear(): Promise<void>;
    registerListCacheKey(module: string, key: string): void;
    clearListCachesByModule(module: string): Promise<void>;
}
