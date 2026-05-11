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
exports.mailConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
exports.mailConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            transport: {
                host: configService.get("email.host"),
                port: configService.get("email.port"),
                ignoreTLS: true,
                secure: configService.get("email.secure"),
                auth: {
                    user: configService.get("email.user"),
                    pass: configService.get("email.pass")
                }
            },
            preview: configService.get("server.env") == "development",
            defaults: {
                from: `"Standard " <${configService.get("email.user")}>`
            },
            template: {
                dir: "libs/@oc/server-core/email-templates",
                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                options: {
                    strict: true
                }
            },
            otp_validity_minutes: configService.get("app.otp.expire_time"),
            support_email: configService.get("email.support_email"),
            academy_name: configService.get("email.academy_name"),
            academy_website: configService.get("email.academy_website")
        });
    })
};
//# sourceMappingURL=mail.config.js.map