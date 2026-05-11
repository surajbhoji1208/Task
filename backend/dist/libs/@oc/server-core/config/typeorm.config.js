"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const audit_subscriber_1 = require("../database/subscribers/audit.subscriber");
exports.typeOrmConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            type: "postgres",
            host: configService.get("db.host"),
            port: configService.get("db.port"),
            username: configService.get("db.username"),
            password: configService.get("db.password"),
            database: configService.get("db.database"),
            logging: configService.get("db.logging") ? [
                "query",
                "error",
                "schema",
                "warn",
                "info",
                "log"
            ] : false,
            cache: configService.get("db.cache"),
            synchronize: configService.get("db.synchronize"),
            entities: [__dirname + "/../database/entities/*.entity{.ts,.js}"],
            subscribers: [audit_subscriber_1.AuditSubscriber]
        });
    }),
    dataSourceFactory: (options) => __awaiter(void 0, void 0, void 0, function* () {
        const dataSource = yield new typeorm_1.DataSource(options).initialize();
        return dataSource;
    })
};
//# sourceMappingURL=typeorm.config.js.map