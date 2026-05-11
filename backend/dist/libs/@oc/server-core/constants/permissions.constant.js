"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PERMISSIONS = exports.PERMISSION_CONSTANTS = exports.MODULE_CONSTANTS = void 0;
exports.getDefaultModulePermissions = getDefaultModulePermissions;
exports.getAvailableModules = getAvailableModules;
exports.MODULE_CONSTANTS = {
    USER: "User",
    AUTH: "Auth",
    PRODUCT: "Product",
    CATEGORY: "Category",
    REVIEW: "Review",
    ANALYTICS: "Analytics",
    IMPORT: "Import"
};
exports.PERMISSION_CONSTANTS = {
    READ: "read",
    WRITE: "write",
    EDIT: "edit",
    DELETE: "delete"
};
exports.DEFAULT_PERMISSIONS = [];
function getDefaultModulePermissions(moduleName) {
    return null;
}
function getAvailableModules() {
    return Object.values(exports.MODULE_CONSTANTS);
}
//# sourceMappingURL=permissions.constant.js.map