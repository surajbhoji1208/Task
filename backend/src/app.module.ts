import { typeOrmConfig } from "@core-config";
import { Validator } from "class-validator";
import { CustomValidatorModule } from "@core-custom-validators";
import { AllHttpExceptionFilter } from "@core-filters";
import { AuditContextService } from "@core-generic-services";
import { LanguageMiddleware } from "@core-middleware";
import { AuditMiddleware } from "../libs/@oc/server-core/middleware/audit.middleware";

import { AppCacheModule, SharedModule } from "@core-shared-modules";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configuration } from "config/configuration";
import { validationSchema } from "config/validation";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { ProfilerModule } from "./modules/profiler/profiling.module";
import { ProductModule } from "./modules/product/product.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { ImportModule } from "./modules/import/import.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
            load: [configuration],
            validationSchema,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        ThrottlerModule.forRoot([
            {
                name: "short",
                ttl: 1,
                limit: 60
            }
        ]),
        ScheduleModule.forRoot(),
        CustomValidatorModule,
        ProfilerModule,
        AppCacheModule,
        SharedModule,
        AuthModule,
        UserModule,
        ProductModule,
        AnalyticsModule,
        ImportModule
    ],
    controllers: [AppController],
    providers: [
        AuditContextService,
        Validator,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        AllHttpExceptionFilter
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LanguageMiddleware, AuditMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
    }
}
