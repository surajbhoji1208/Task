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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFileTypeConstraint = void 0;
exports.ValidateFileType = ValidateFileType;
const _core_enums_1 = require("../enums");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const path = __importStar(require("path"));
const translation_utility_1 = require("../utilities/translation.utility");
let ValidateFileTypeConstraint = class ValidateFileTypeConstraint {
    constructor() { }
    validate(value, args) {
        const { allowedTypes } = args.constraints[0].constraints;
        if (Array.isArray(value)) {
            if (value.length === 0)
                return true;
            return value.every((file) => {
                if (file === null || file === void 0 ? void 0 : file.path) {
                    const fileExtension = path.extname(file.originalname || file.filename).toLowerCase();
                    return allowedTypes.includes(fileExtension);
                }
                return true;
            });
        }
        else if (value === null || value === void 0 ? void 0 : value.path) {
            const fileExtension = path.extname(value.originalname || value.filename).toLowerCase();
            return allowedTypes.includes(fileExtension);
        }
        return true;
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        constraints.allowedTypesString = constraints.allowedTypes.join(", ");
        return `${translation_utility_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_FILE_TYPE", constraints)}&&&${args.property}`;
    }
};
exports.ValidateFileTypeConstraint = ValidateFileTypeConstraint;
exports.ValidateFileTypeConstraint = ValidateFileTypeConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)(),
    __metadata("design:paramtypes", [])
], ValidateFileTypeConstraint);
function ValidateFileType(validationOptions, options) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions],
            validator: ValidateFileTypeConstraint
        });
    };
}
//# sourceMappingURL=validate-file-type.js.map