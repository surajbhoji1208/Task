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
exports.ValidateAlphaNumericConstraint = void 0;
exports.ValidateAlphaNumeric = ValidateAlphaNumeric;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const translation_utility_1 = require("../utilities/translation.utility");
const _core_enums_1 = require("../enums");
let ValidateAlphaNumericConstraint = class ValidateAlphaNumericConstraint {
    constructor() { }
    validate(value) {
        const format = /^[a-zA-Z0-9]*$/;
        return format.test(value);
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        return `${translation_utility_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_ALPHA_NUMERIC", constraints)}&&&${args.property}`;
    }
};
exports.ValidateAlphaNumericConstraint = ValidateAlphaNumericConstraint;
exports.ValidateAlphaNumericConstraint = ValidateAlphaNumericConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)(),
    __metadata("design:paramtypes", [])
], ValidateAlphaNumericConstraint);
function ValidateAlphaNumeric(validationOptions, options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [validationOptions],
            options: options,
            validator: ValidateAlphaNumericConstraint
        });
    };
}
//# sourceMappingURL=validate-alpha-numeric.js.map