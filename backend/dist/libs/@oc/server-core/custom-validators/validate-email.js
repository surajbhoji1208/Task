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
exports.ValidateEmailConstraint = void 0;
exports.ValidateEmail = ValidateEmail;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidateEmailConstraint = class ValidateEmailConstraint {
    constructor() { }
    validate(value) {
        if (typeof value !== "string")
            return true;
        if (value && value.trim().length !== 0 && value != "" && !(0, class_validator_1.isEmail)(value))
            return false;
        return true;
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_NOT_VALID", constraints)}&&&${args.property}`;
    }
};
exports.ValidateEmailConstraint = ValidateEmailConstraint;
exports.ValidateEmailConstraint = ValidateEmailConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __metadata("design:paramtypes", [])
], ValidateEmailConstraint);
function ValidateEmail(validationOptions, options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [validationOptions],
            options: options,
            validator: ValidateEmailConstraint
        });
    };
}
//# sourceMappingURL=validate-email.js.map