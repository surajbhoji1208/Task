"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFileSizeConstraint = void 0;
exports.ValidateFileSize = ValidateFileSize;
const _core_enums_1 = require("../enums");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const translation_utility_1 = require("../utilities/translation.utility");
let ValidateFileSizeConstraint = class ValidateFileSizeConstraint {
    constructor() { }
    validate(value, args) {
        const { minSize, maxSize } = args.constraints[0].constraints;
        if (value && value.size !== undefined) {
            const fileSizeInBytes = value.size;
            if (minSize && fileSizeInBytes < minSize) {
                return false;
            }
            if (maxSize && fileSizeInBytes > maxSize) {
                return false;
            }
            return true;
        }
        return true;
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        if (constraints.minSize) {
            constraints.minSizeMB = (constraints.minSize / (1024 * 1024)).toFixed(2);
        }
        if (constraints.maxSize) {
            constraints.maxSizeMB = (constraints.maxSize / (1024 * 1024)).toFixed(2);
        }
        return `${translation_utility_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_FILE_SIZE", constraints)}&&&${args.property}`;
    }
};
exports.ValidateFileSizeConstraint = ValidateFileSizeConstraint;
exports.ValidateFileSizeConstraint = ValidateFileSizeConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)(),
    __metadata("design:paramtypes", [])
], ValidateFileSizeConstraint);
function ValidateFileSize(validationOptions, options) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions],
            validator: ValidateFileSizeConstraint
        });
    };
}
//# sourceMappingURL=validate-file-size.js.map