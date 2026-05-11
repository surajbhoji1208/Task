"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const audit_subscriber_1 = require("./subscribers/audit.subscriber");
const envFile = `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`;
(0, dotenv_1.config)({ path: envFile });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    logging: process.env.DATABASE_LOG === "true",
    cache: process.env.DATABASE_CACHE === "true",
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: false,
    entities: [__dirname + "/entities/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    subscribers: [audit_subscriber_1.AuditSubscriber],
});
//# sourceMappingURL=data-source.js.map