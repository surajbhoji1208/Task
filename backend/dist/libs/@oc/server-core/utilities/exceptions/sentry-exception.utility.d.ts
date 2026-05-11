import { ConfigService } from "@nestjs/config";
import * as Sentry from "@sentry/node";
export declare const captureExceptionInSentry: (exception: any, request: any, configService: ConfigService) => void;
export declare const sanitizeHeaders: (headers: any) => any;
export declare const isSentryEnabled: (configService: ConfigService) => boolean;
export declare const setSentryUser: (user: Sentry.User) => void;
export declare const setSentryContext: (name: string, context: any) => void;
