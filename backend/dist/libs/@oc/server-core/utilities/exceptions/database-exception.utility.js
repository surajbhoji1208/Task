"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractColumnFromDetail = exports.extractFieldFromDetail = exports.handleDatabaseError = void 0;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger("DatabaseExceptionUtility");
const handleDatabaseError = (exception) => {
    const driverError = exception.driverError;
    logger.debug(`Handling database error with code: ${driverError.code}`);
    switch (driverError.code) {
        case "23503": {
            const fkField = (0, exports.extractFieldFromDetail)(driverError.detail);
            logger.debug(`Foreign key violation on field: ${fkField}`);
            return {
                message: "ERR_FOREIGN_KEY_VIOLATION",
                field: fkField || "unknown field"
            };
        }
        case "23505": {
            const uniqueField = (0, exports.extractFieldFromDetail)(driverError.detail);
            logger.debug(`Unique constraint violation on field: ${uniqueField}`);
            return {
                message: "ERR_UNIQUE_CONSTRAINT_VIOLATION",
                field: uniqueField || "unknown field"
            };
        }
        case "23502": {
            const notNullField = (0, exports.extractColumnFromDetail)(driverError.detail);
            logger.debug(`Not null violation on column: ${notNullField}`);
            return {
                message: "ERR_NOT_NULL_VIOLATION",
                field: notNullField || "unknown field"
            };
        }
        case "23514":
            logger.debug("Check constraint violation");
            return { message: "ERR_CHECK_CONSTRAINT_VIOLATION" };
        case "42703":
            logger.debug("Undefined column error");
            return { message: "ERR_UNDEFINED_COLUMN" };
        case "42P01":
            logger.debug("Undefined table error");
            return { message: "ERR_UNDEFINED_TABLE" };
        default:
            logger.error("Unhandled database error:", driverError);
            return { message: "ERR_DATABASE_ERROR" };
    }
};
exports.handleDatabaseError = handleDatabaseError;
const extractFieldFromDetail = (detail) => {
    if (!detail)
        return null;
    const fkRegex = /Key \(([^)]+)\)=\([^)]+\) is not present/;
    const fkMatch = fkRegex.exec(detail);
    if (fkMatch)
        return fkMatch[1];
    const uniqueRegex = /Key \(([^)]+)\)=\([^)]+\) already exists/;
    const uniqueMatch = uniqueRegex.exec(detail);
    if (uniqueMatch)
        return uniqueMatch[1];
    return null;
};
exports.extractFieldFromDetail = extractFieldFromDetail;
const extractColumnFromDetail = (detail) => {
    if (!detail)
        return null;
    const notNullRegex = /null value in column "([^"]+)" violates not-null constraint/;
    const notNullMatch = notNullRegex.exec(detail);
    if (notNullMatch)
        return notNullMatch[1];
    return null;
};
exports.extractColumnFromDetail = extractColumnFromDetail;
//# sourceMappingURL=database-exception.utility.js.map