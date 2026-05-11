import { ApiProfile, ProfilerService } from "../../../libs/@oc/server-core/shared-modules";
export declare class ProfilerController {
    private readonly profilerService;
    constructor(profilerService: ProfilerService);
    getProfilerData(): {
        summary: any;
        profiles: ApiProfile[];
    };
    getProfilerSummary(): any;
    getSlowEndpoints(): ApiProfile[];
    getHighErrorRateEndpoints(): ApiProfile[];
    clearProfilerData(): {
        message: string;
    };
    getProfilerUI(): any;
    getProfilerScript(): any;
}
