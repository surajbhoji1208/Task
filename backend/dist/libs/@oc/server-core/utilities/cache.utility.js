"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCacheKey = void 0;
const crypto_1 = require("crypto");
const GetCacheKey = (module, key, isList = false, filters) => {
    if (isList && filters) {
        const filtersString = JSON.stringify(filters);
        const hash = (0, crypto_1.createHash)("md5").update(filtersString).digest("hex");
        return `${module}-${key}-${hash}`;
    }
    return `${module}-${key}`;
};
exports.GetCacheKey = GetCacheKey;
//# sourceMappingURL=cache.utility.js.map