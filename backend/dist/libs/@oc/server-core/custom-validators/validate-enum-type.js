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
exports.ValidateEnumTypeConstraint = void 0;
exports.ValidateEnumType = ValidateEnumType;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidateEnumTypeConstraint = class ValidateEnumTypeConstraint {
    constructor() { }
    validate(value, args) {
        if (value === undefined || value === null) {
            return true;
        }
        const enumType = args.constraints[0];
        if (typeof value === "string") {
            const numericValue = parseInt(value, 10);
            if (!isNaN(numericValue)) {
                return (0, class_validator_1.isEnum)(numericValue, enumType);
            }
            return (0, class_validator_1.isEnum)(value, enumType);
        }
        return (0, class_validator_1.isEnum)(value, args.constraints[0]);
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[1];
        const language = "en";
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_IS_ENUM", constraints)}&&&${args.property}`;
    }
};
exports.ValidateEnumTypeConstraint = ValidateEnumTypeConstraint;
exports.ValidateEnumTypeConstraint = ValidateEnumTypeConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __metadata("design:paramtypes", [])
], ValidateEnumTypeConstraint);
function ValidateEnumType(types, validationOptions, options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [types, validationOptions],
            validator: ValidateEnumTypeConstraint
        });
    };
}
//# sourceMappingURL=validate-enum-type.js.map