"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerModule = void 0;
const _core_shared_modules_1 = require("../../../libs/@oc/server-core/shared-modules");
const common_1 = require("@nestjs/common");
const profiling_controller_1 = require("./profiling.controller");
let ProfilerModule = class ProfilerModule {
};
exports.ProfilerModule = ProfilerModule;
exports.ProfilerModule = ProfilerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [_core_shared_modules_1.AppProfilerModule],
        controllers: [profiling_controller_1.ProfilerController],
    })
], ProfilerModule);
//# sourceMappingURL=profiling.module.js.map