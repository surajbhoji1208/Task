import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { ProfilerService } from "../shared-modules/profiler/app-profiler.service";
export declare class ProfilerInterceptor implements NestInterceptor {
    private readonly profilingService;
    constructor(profilingService: ProfilerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private normalizePath;
}
