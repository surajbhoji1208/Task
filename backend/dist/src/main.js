"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _core_config_1 = require("../libs/@oc/server-core/config");
const _core_filters_1 = require("../libs/@oc/server-core/filters");
const _core_interceptors_1 = require("../libs/@oc/server-core/interceptors");
const _core_shared_modules_1 = require("../libs/@oc/server-core/shared-modules");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const Sentry = __importStar(require("@sentry/node"));
const body_parser_1 = require("body-parser");
const class_validator_1 = require("class-validator");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            logger: process.env.LOG_ENABLE === "true" ? ["debug", "error", "warn", "log"] : false
        });
        app.use((0, helmet_1.default)({ contentSecurityPolicy: true }));
        const configService = app.get(config_1.ConfigService);
        const sentryEnabled = configService.get("sentry.enabled");
        const sentryDsn = configService.get("sentry.dsn");
        if (sentryEnabled && sentryDsn) {
            Sentry.init({
                dsn: sentryDsn,
                environment: configService.get("sentry.environment") || configService.get("server.env"),
                tracesSampleRate: configService.get("sentry.traces_sample_rate"),
                profilesSampleRate: configService.get("sentry.profiles_sample_rate"),
                debug: process.env.NODE_ENV === "development"
            });
        }
        const logger = new common_1.Logger("CORS");
        app.enableCors({
            origin: (origin, callback) => __awaiter(this, void 0, void 0, function* () {
                if (!origin) {
                    return callback(null, true);
                }
                const allowedOrigins = configService.get("server.origin");
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }
                logger.warn(`Blocked CORS for origin: ${origin}`);
                callback(new common_1.ForbiddenException("Not allowed by CORS"));
            }),
            methods: "GET,PUT,PATCH,POST,DELETE",
            credentials: true
        });
        (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
        try {
            const validator = app.get(class_validator_1.Validator);
            console.log('Validator resolved successfully:', !!validator);
        }
        catch (e) {
            console.log('Validator not resolved:', e.message);
        }
        app.use((0, body_parser_1.json)({ limit: "15mb" }));
        app.use((0, compression_1.default)());
        app.setGlobalPrefix("v1");
        const cookieSecret = configService.get("cookie_secret.secret");
        app.use((0, cookie_parser_1.default)(cookieSecret));
        app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
        const profilingService = app.get(_core_shared_modules_1.ProfilerService);
        app.useGlobalInterceptors(new _core_interceptors_1.ReqResInterceptor(), new _core_interceptors_1.ProfilerInterceptor(profilingService));
        const allHttpExceptionFilter = app.get(_core_filters_1.AllHttpExceptionFilter);
        app.useGlobalFilters(allHttpExceptionFilter);
        const document = swagger_1.SwaggerModule.createDocument(app, _core_config_1.SwaggerConfig);
        swagger_1.SwaggerModule.setup("api", app, document);
        const serverPort = configService.get("server.port");
        yield app.listen(serverPort);
        console.log(`please check below for swagger \n http://localhost:${serverPort}/api`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map