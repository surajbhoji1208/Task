"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const _core_config_1 = require("../libs/@oc/server-core/config");
const class_validator_1 = require("class-validator");
const _core_custom_validators_1 = require("../libs/@oc/server-core/custom-validators");
const _core_filters_1 = require("../libs/@oc/server-core/filters");
const _core_generic_services_1 = require("../libs/@oc/server-core/generic-service");
const _core_middleware_1 = require("../libs/@oc/server-core/middleware");
const audit_middleware_1 = require("../libs/@oc/server-core/middleware/audit.middleware");
const _core_shared_modules_1 = require("../libs/@oc/server-core/shared-modules");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = require("../config/configuration");
const validation_1 = require("../config/validation");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const profiling_module_1 = require("./modules/profiler/profiling.module");
const product_module_1 = require("./modules/product/product.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const import_module_1 = require("./modules/import/import.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(_core_middleware_1.LanguageMiddleware, audit_middleware_1.AuditMiddleware).forRoutes({ path: "*", method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
                load: [configuration_1.configuration],
                validationSchema: validation_1.validationSchema,
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync(_core_config_1.typeOrmConfig),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: "short",
                    ttl: 1,
                    limit: 60
                }
            ]),
            schedule_1.ScheduleModule.forRoot(),
            _core_custom_validators_1.CustomValidatorModule,
            profiling_module_1.ProfilerModule,
            _core_shared_modules_1.AppCacheModule,
            _core_shared_modules_1.SharedModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            analytics_module_1.AnalyticsModule,
            import_module_1.ImportModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            _core_generic_services_1.AuditContextService,
            class_validator_1.Validator,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            },
            _core_filters_1.AllHttpExceptionFilter
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map