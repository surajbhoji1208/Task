"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const app_profiler_service_1 = require("../shared-modules/profiler/app-profiler.service");
let ProfilerInterceptor = class ProfilerInterceptor {
    constructor(profilingService) {
        this.profilingService = profilingService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const startTime = Date.now();
        const method = request.method;
        const path = this.normalizePath(request);
        const isAppRoute = path === "/v1" ||
            path.includes("/v1/profiler") ||
            path.includes("/v1/profiler-ui");
        if (isAppRoute) {
            return next.handle();
        }
        const store = { cacheHits: 0, cacheMisses: 0 };
        return this.profilingService.storage.run(store, () => {
            return next.handle().pipe((0, rxjs_1.tap)(() => {
                const responseTime = Date.now() - startTime;
                const endpoint = `${method} ${path}`;
                setImmediate(() => this.profilingService.recordProfile(endpoint, method, path, responseTime, false, store.cacheHits || 0, store.cacheMisses || 0));
            }), (0, rxjs_1.catchError)((err) => {
                const responseTime = Date.now() - startTime;
                const endpoint = `${method} ${path}`;
                setImmediate(() => this.profilingService.recordProfile(endpoint, method, path, responseTime, true, store.cacheHits || 0, store.cacheMisses || 0));
                throw err;
            }));
        });
    }
    normalizePath(request) {
        var _a;
        if ((_a = request.route) === null || _a === void 0 ? void 0 : _a.path) {
            return Array.isArray(request.route.path) ? request.route.path[0] : request.route.path;
        }
        let path = request.url.split('?')[0];
        path = path.replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, ':uuid');
        path = path.split('/').map(segment => {
            return /^\d+$/.test(segment) ? ':id' : segment;
        }).join('/');
        return path;
    }
};
exports.ProfilerInterceptor = ProfilerInterceptor;
exports.ProfilerInterceptor = ProfilerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_profiler_service_1.ProfilerService])
], ProfilerInterceptor);
//# sourceMappingURL=profiler.interceptor.js.map