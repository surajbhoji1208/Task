import { ProductRepository, ProductService } from "@business-core-modules";
import { Product } from "@core-database";
import { AppCacheModule } from "@core-shared-modules";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), AppCacheModule],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService]
})
export class ProductModule {}
