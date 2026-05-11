/**
 * Utility for mapping technical module names to human-readable names
 * Used for error messages, success messages, and user-facing text
 */

import { ModuleName } from "@core-enums";

/**
 * Mapping of technical module names to human-readable names
 */
const MODULE_NAME_MAP: Record<string, string> = {
    // User Management
    [ModuleName.USER]: "User",

    // Authentication
    [ModuleName.AUTH]: "Authentication",

    // Product Management
    [ModuleName.PRODUCT]: "Product",
    [ModuleName.CATEGORY]: "Category",
    [ModuleName.REVIEW]: "Review",

    // Analytics
    [ModuleName.ANALYTICS]: "Analytics",

    // Import
    [ModuleName.IMPORT]: "Import"
};

/**
 * Type guard to check if a string is a valid ModuleName enum value
 */
function isValidModuleName(name: string): name is ModuleName {
    return Object.values(ModuleName).includes(name as ModuleName);
}

/**
 * Converts a technical module name (string or enum) to a human-readable name
 * @param technicalName The technical module name (string or ModuleName enum)
 * @returns The human-readable name for use in messages
 */
export function MapToModuleName(technicalName: string | ModuleName): string {
    isValidModuleName(technicalName);
    // technicalName is already a string (enum values are strings in TypeScript)
    const key = technicalName;
    return MODULE_NAME_MAP[key] || key;
}

/**
 * Gets all available module mappings for documentation/reference
 */
export function GetAllModuleMappings(): Record<string, string> {
    return { ...MODULE_NAME_MAP };
}
