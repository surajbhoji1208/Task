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
exports.ValidateMaxValueConstraint = void 0;
exports.ValidateMaxValue = ValidateMaxValue;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const class_validator_1 = require("class-validator");
let ValidateMaxValueConstraint = class ValidateMaxValueConstraint {
    constructor() { }
    validate(value, args) {
        const maxNumber = args.constraints[1];
        if ((0, class_validator_1.isNumber)(value)) {
            return (0, class_validator_1.max)(value, maxNumber);
        }
        return true;
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        constraints.max = args.constraints[1];
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_MAX_VALUE", constraints)}&&&${args.property}`;
    }
};
exports.ValidateMaxValueConstraint = ValidateMaxValueConstraint;
exports.ValidateMaxValueConstraint = ValidateMaxValueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false }),
    __metadata("design:paramtypes", [])
], ValidateMaxValueConstraint);
function ValidateMaxValue(length, validationOptions, options) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions, length],
            validator: ValidateMaxValueConstraint
        });
    };
}
//# sourceMappingURL=validate-max-value.js.map