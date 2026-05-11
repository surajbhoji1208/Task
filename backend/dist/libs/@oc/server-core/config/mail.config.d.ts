import { HandlebarsAdapter } from "@nestjs-modules/mailer/adapters/handlebars.adapter";
import { ConfigModule, ConfigService } from "@nestjs/config";
export declare const mailConfig: {
    imports: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<{
        transport: {
            host: any;
            port: any;
            ignoreTLS: boolean;
            secure: any;
            auth: {
                user: any;
                pass: any;
            };
        };
        preview: boolean;
        defaults: {
            from: string;
        };
        template: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
        otp_validity_minutes: any;
        support_email: any;
        academy_name: any;
        academy_website: any;
    }>;
};
