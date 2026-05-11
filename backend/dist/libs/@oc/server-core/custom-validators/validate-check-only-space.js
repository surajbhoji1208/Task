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
exports.ValidateOnlySpaceConstraint = void 0;
exports.ValidateOnlySpace = ValidateOnlySpace;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidateOnlySpaceConstraint = class ValidateOnlySpaceConstraint {
    constructor() { }
    validate(value) {
        return !!(value === undefined || typeof value !== "string" || value.trim().length !== 0 || value.length === 0);
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_ONLY_SPACE", constraints)}&&&${args.property}`;
    }
};
exports.ValidateOnlySpaceConstraint = ValidateOnlySpaceConstraint;
exports.ValidateOnlySpaceConstraint = ValidateOnlySpaceConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)(),
    __metadata("design:paramtypes", [])
], ValidateOnlySpaceConstraint);
function ValidateOnlySpace(validationOptions, options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions],
            validator: ValidateOnlySpaceConstraint
        });
    };
}
//# sourceMappingURL=validate-check-only-space.js.map