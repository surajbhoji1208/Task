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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = __importStar(require("joi"));
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "production").default("development"),
    SERVER_PORT: Joi.number().default(3031),
    WHITELIST: Joi.string().required(),
    DATABASE_HOST: Joi.string().default("localhost"),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASS: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_SYNC: Joi.boolean().default(false),
    DATABASE_LOG: Joi.boolean().default(true),
    DATABASE_CACHE: Joi.boolean().default(true),
    LOG_ENABLE: Joi.boolean().default(true),
    JWT_EXPIRE_IN: Joi.number().default(3600),
    JWT_SECRET_KEY: Joi.string().required(),
    REFRESH_TOKEN_EXPIRE_IN: Joi.number().default(604800),
    REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),
    FORGOT_PASSWORD_EMAIL_VALID_TILL: Joi.number().default(30),
    SUPER_ADMIN_WEB_URL: Joi.string().default("https://dev.waitless.app/"),
    EMAIL_HOST: Joi.string().default("smtp.mailtrap.io"),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASS: Joi.string().required(),
    EMAIL_PORT: Joi.number().default(2525),
    EMAIL_SECURE: Joi.boolean().default(false),
    TWILIO_ACCOUNTSID: Joi.string().required(),
    TWILIO_APIKEY: Joi.string().required(),
    TWILIO_APISECRET: Joi.string().required(),
    TWILIO_PHONE_NUMBER: Joi.string().required(),
    OTP_EXPIRE_TIME: Joi.number().default(15),
    OTP_ENABLED: Joi.boolean().default(false),
    DOC_URL: Joi.string().default("https://aws-s3.bucket.com/"),
    FRONTEND_BASE_URL: Joi.string().required(),
    ADMIN_BASE_URL: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
    FCM_SERVER_KEY: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required(),
    SENTRY_DSN: Joi.string().required(),
    SENTRY_ENVIRONMENT: Joi.string().required(),
    SENTRY_TRACES_SAMPLE_RATE: Joi.string().required(),
    SENTRY_PROFILES_SAMPLE_RATE: Joi.string().required(),
    SENTRY_ENABLED: Joi.string().required(),
    MAIN_DOMAIN: Joi.string().required()
});
//# sourceMappingURL=validation.js.map