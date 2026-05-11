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
exports.ValidateMaxLengthConstraint = void 0;
exports.ValidateMaxLength = ValidateMaxLength;
const class_validator_1 = require("class-validator");
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
let ValidateMaxLengthConstraint = class ValidateMaxLengthConstraint {
    constructor() { }
    validate(value, args) {
        const length = args.constraints[1];
        if (typeof value !== "string" || !(0, class_validator_1.isNotEmpty)(value)) {
            return true;
        }
        if (value.length > length) {
            return false;
        }
        return true;
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        constraints.max = args.constraints[1];
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_MAX_LENGTH", constraints)}&&&${args.property}`;
    }
};
exports.ValidateMaxLengthConstraint = ValidateMaxLengthConstraint;
exports.ValidateMaxLengthConstraint = ValidateMaxLengthConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false }),
    __metadata("design:paramtypes", [])
], ValidateMaxLengthConstraint);
function ValidateMaxLength(length, validationOptions, options) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions, length],
            validator: ValidateMaxLengthConstraint
        });
    };
}
//# sourceMappingURL=validate-max-length.js.map