"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateLogPrefix = GenerateLogPrefix;
exports.GenerateLoggingPrefix = GenerateLoggingPrefix;
function GenerateLogPrefix(functionName, requestId) {
    const logPrefix = [functionName];
    if (requestId) {
        logPrefix.push(" - ");
        logPrefix.push(requestId);
    }
    logPrefix.push(" -");
    return logPrefix.join("");
}
function GenerateLoggingPrefix(functionName, requestId) {
    return {
        logPrefix: GenerateLogPrefix(functionName, requestId)
    };
}
//# sourceMappingURL=logger.utility.js.map