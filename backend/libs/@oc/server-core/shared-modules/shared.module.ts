import { Global, Module } from "@nestjs/common";
import { AppCacheModule } from "./cache/app-cache.module";
import { AppJwtModule } from "./jwt/app-jwt.module";
import { AppMailerModule } from "./mailer/app-mailer.module";
import { AppProfilerModule } from "./profiler/app-profiler.module";

/**
 * Global utilities module
 * Provides utility services that can be injected anywhere in the application
 */
@Global()
@Module({
    imports: [
        AppProfilerModule,
        AppCacheModule,
        AppJwtModule,
        AppMailerModule
    ],
    providers: [],
    exports: [
        AppProfilerModule,
        AppCacheModule,
        AppJwtModule,
        AppMailerModule
    ]
})
export class SharedModule { }
