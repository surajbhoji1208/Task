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
exports.setSentryContext = exports.setSentryUser = exports.isSentryEnabled = exports.sanitizeHeaders = exports.captureExceptionInSentry = void 0;
const common_1 = require("@nestjs/common");
const Sentry = __importStar(require("@sentry/node"));
const logger = new common_1.Logger("SentryUtility");
const captureExceptionInSentry = (exception, request, configService) => {
    try {
        const sentryEnabled = configService.get("sentry.enabled");
        const sentryDsn = configService.get("sentry.dsn");
        if (!sentryEnabled || !sentryDsn) {
            logger.debug("Sentry is disabled or DSN not configured");
            return;
        }
        if (exception instanceof common_1.HttpException && ([
            common_1.HttpStatus.NOT_FOUND,
            common_1.HttpStatus.CONFLICT,
            common_1.HttpStatus.UNAUTHORIZED,
            common_1.HttpStatus.NO_CONTENT,
            common_1.HttpStatus.BAD_REQUEST,
            common_1.HttpStatus.FORBIDDEN
        ].includes(exception.getStatus()))) {
            logger.debug(`Skipping capture of known exception: status ${exception.getStatus()}`);
            return;
        }
        logger.log("Capturing exception in Sentry");
        if (exception instanceof Error) {
            Sentry.withScope((scope) => {
                var _a;
                scope.setTag("http.method", request.method);
                scope.setTag("http.url", request.url);
                if (request.user) {
                    scope.setUser({
                        id: (_a = request.user.sub) === null || _a === void 0 ? void 0 : _a.toString(),
                        email: request.user.email,
                        username: `${request.user.firstName} ${request.user.lastName}`
                    });
                }
                scope.setExtra("headers", (0, exports.sanitizeHeaders)(request.headers));
                scope.setExtra("params", request.params);
                scope.setExtra("query", request.query);
                Sentry.captureException(exception);
                logger.debug("Exception captured in Sentry successfully");
            });
        }
        else {
            Sentry.captureMessage(`Non-error exception: ${exception}`);
            logger.debug("Non-error exception captured in Sentry");
        }
    }
    catch (sentryError) {
        logger.error("Failed to capture exception in Sentry:", sentryError);
    }
};
exports.captureExceptionInSentry = captureExceptionInSentry;
const sanitizeHeaders = (headers) => {
    if (!headers)
        return {};
    const sanitized = Object.assign({}, headers);
    const sensitiveHeaders = ["authorization", "cookie", "set-cookie", "x-api-key"];
    sensitiveHeaders.forEach((header) => {
        if (sanitized[header]) {
            sanitized[header] = "[REDACTED]";
        }
    });
    logger.debug("Headers sanitized for Sentry");
    return sanitized;
};
exports.sanitizeHeaders = sanitizeHeaders;
const isSentryEnabled = (configService) => {
    const result = configService.get("sentry.enabled") && configService.get("sentry.dsn") !== undefined;
    logger.debug(`Sentry enabled check: ${result}`);
    return result;
};
exports.isSentryEnabled = isSentryEnabled;
const setSentryUser = (user) => {
    try {
        Sentry.setUser(user);
        logger.debug("Sentry user context set");
    }
    catch (error) {
        logger.error("Failed to set Sentry user:", error);
    }
};
exports.setSentryUser = setSentryUser;
const setSentryContext = (name, context) => {
    try {
        Sentry.setContext(name, context);
        logger.debug(`Sentry context '${name}' set`);
    }
    catch (error) {
        logger.error("Failed to set Sentry context:", error);
    }
};
exports.setSentryContext = setSentryContext;
//# sourceMappingURL=sentry-exception.utility.js.map