import { ImportService } from "@business-core-modules";
import { ImportHistory } from "@core-database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportController } from "./import.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ImportHistory])],
    controllers: [ImportController],
    providers: [ImportService],
    exports: [ImportService]
})
export class ImportModule {}
