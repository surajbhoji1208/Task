export declare const MODULE_CONSTANTS: {
    readonly USER: "User";
    readonly AUTH: "Auth";
    readonly PRODUCT: "Product";
    readonly CATEGORY: "Category";
    readonly REVIEW: "Review";
    readonly ANALYTICS: "Analytics";
    readonly IMPORT: "Import";
};
export declare const PERMISSION_CONSTANTS: {
    readonly READ: "read";
    readonly WRITE: "write";
    readonly EDIT: "edit";
    readonly DELETE: "delete";
};
export type Permission = any;
export type RolePermission = any;
export declare const DEFAULT_PERMISSIONS: any[];
export declare function getDefaultModulePermissions(moduleName: string): any | null;
export declare function getAvailableModules(): string[];
