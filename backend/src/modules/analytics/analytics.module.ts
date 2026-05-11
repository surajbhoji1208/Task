import { AnalyticsRepository, AnalyticsService } from "@business-core-modules";
import { Product, Review } from "@core-database";
import { AppCacheModule } from "@core-shared-modules";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyticsController } from "./analytics.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Review]), AppCacheModule],
    controllers: [AnalyticsController],
    providers: [AnalyticsService, AnalyticsRepository],
    exports: [AnalyticsService]
})
export class AnalyticsModule {}
