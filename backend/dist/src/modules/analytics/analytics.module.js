"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _core_database_1 = require("../../../libs/@oc/server-core/database");
const _core_shared_modules_1 = require("../../../libs/@oc/server-core/shared-modules");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const analytics_controller_1 = require("./analytics.controller");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([_core_database_1.Product, _core_database_1.Review]), _core_shared_modules_1.AppCacheModule],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [_business_core_modules_1.AnalyticsService, _business_core_modules_1.AnalyticsRepository],
        exports: [_business_core_modules_1.AnalyticsService]
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map