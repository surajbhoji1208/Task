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
exports.ProfilerController = void 0;
const _core_shared_modules_1 = require("../../../libs/@oc/server-core/shared-modules");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ProfilerController = class ProfilerController {
    constructor(profilerService) {
        this.profilerService = profilerService;
    }
    getProfilerData() {
        return {
            summary: this.profilerService.getSummary(),
            profiles: this.profilerService.getAllProfiles()
        };
    }
    getProfilerSummary() {
        return this.profilerService.getSummary();
    }
    getSlowEndpoints() {
        return this.profilerService.getSlowEndpoints();
    }
    getHighErrorRateEndpoints() {
        return this.profilerService.getHighErrorRateEndpoints();
    }
    clearProfilerData() {
        this.profilerService.clearAllProfiles();
        return { message: "Profiler data cleared successfully" };
    }
    getProfilerUI() {
        const fs = require("fs");
        const path = require("path");
        const htmlPath = path.join(__dirname, "..", "libs/@oc/server-core/assets", "profiler-dashboard.html");
        const finalPath = fs.existsSync(htmlPath)
            ? htmlPath
            : path.join(process.cwd(), "libs/@oc/server-core/assets", "profiler-dashboard.html");
        if (!fs.existsSync(finalPath)) {
            return "Dashboard source not found. Please ensure src/profiler-dashboard.html exists.";
        }
        return fs.readFileSync(finalPath, "utf8");
    }
    getProfilerScript() {
        const fs = require("fs");
        const path = require("path");
        const jsPath = path.join(__dirname, "..", "libs/@oc/server-core/assets", "profiler-dashboard.js");
        const finalPath = fs.existsSync(jsPath)
            ? jsPath
            : path.join(process.cwd(), "libs/@oc/server-core/assets", "profiler-dashboard.js");
        if (!fs.existsSync(finalPath)) {
            return "// Dashboard script not found.";
        }
        return fs.readFileSync(finalPath, "utf8");
    }
};
exports.ProfilerController = ProfilerController;
__decorate([
    (0, common_1.Get)("profiler"),
    (0, swagger_1.ApiOperation)({ summary: "Get API profiler data" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profiler data retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ProfilerController.prototype, "getProfilerData", null);
__decorate([
    (0, common_1.Get)("profiler/summary"),
    (0, swagger_1.ApiOperation)({ summary: "Get profiler summary statistics" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profiler summary retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ProfilerController.prototype, "getProfilerSummary", null);
__decorate([
    (0, common_1.Get)("profiler/slow"),
    (0, swagger_1.ApiOperation)({ summary: "Get slow endpoints (average >500ms)" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Slow endpoints retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ProfilerController.prototype, "getSlowEndpoints", null);
__decorate([
    (0, common_1.Get)("profiler/errors"),
    (0, swagger_1.ApiOperation)({ summary: "Get endpoints with high error rates (>5%)" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "High error rate endpoints retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ProfilerController.prototype, "getHighErrorRateEndpoints", null);
__decorate([
    (0, common_1.Post)("profiler/clear"),
    (0, swagger_1.ApiOperation)({ summary: "Clear all profiler data" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profiler data cleared successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ProfilerController.prototype, "clearProfilerData", null);
__decorate([
    (0, common_1.Get)("profiler-ui"),
    (0, common_1.Header)("Content-Type", "text/html"),
    (0, swagger_1.ApiOperation)({ summary: "Serve the profiler dashboard UI" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profiler dashboard retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfilerController.prototype, "getProfilerUI", null);
__decorate([
    (0, common_1.Get)("profiler-ui/script.js"),
    (0, common_1.Header)("Content-Type", "application/javascript"),
    (0, swagger_1.ApiOperation)({ summary: "Serve the profiler dashboard JS" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Profiler dashboard script retrieved successfully" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfilerController.prototype, "getProfilerScript", null);
exports.ProfilerController = ProfilerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [_core_shared_modules_1.ProfilerService])
], ProfilerController);
//# sourceMappingURL=profiling.controller.js.map