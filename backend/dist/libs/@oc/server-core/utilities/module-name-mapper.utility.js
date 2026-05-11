"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapToModuleName = MapToModuleName;
exports.GetAllModuleMappings = GetAllModuleMappings;
const _core_enums_1 = require("../enums");
const MODULE_NAME_MAP = {
    [_core_enums_1.ModuleName.USER]: "User",
    [_core_enums_1.ModuleName.AUTH]: "Authentication",
    [_core_enums_1.ModuleName.PRODUCT]: "Product",
    [_core_enums_1.ModuleName.CATEGORY]: "Category",
    [_core_enums_1.ModuleName.REVIEW]: "Review",
    [_core_enums_1.ModuleName.ANALYTICS]: "Analytics",
    [_core_enums_1.ModuleName.IMPORT]: "Import"
};
function isValidModuleName(name) {
    return Object.values(_core_enums_1.ModuleName).includes(name);
}
function MapToModuleName(technicalName) {
    isValidModuleName(technicalName);
    const key = technicalName;
    return MODULE_NAME_MAP[key] || key;
}
function GetAllModuleMappings() {
    return Object.assign({}, MODULE_NAME_MAP);
}
//# sourceMappingURL=module-name-mapper.utility.js.map