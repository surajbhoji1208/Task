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
exports.ValidateUniqueArrayItemConstraint = void 0;
exports.ValidateUniqueArrayItem = ValidateUniqueArrayItem;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidateUniqueArrayItemConstraint = class ValidateUniqueArrayItemConstraint {
    constructor() { }
    validate(value) {
        if (!(0, class_validator_1.isArray)(value))
            return true;
        return !value || (value && new Set(value).size == value.length);
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_UNIQUE_ARRAY_ITEM", constraints)}&&&${args.property}`;
    }
};
exports.ValidateUniqueArrayItemConstraint = ValidateUniqueArrayItemConstraint;
exports.ValidateUniqueArrayItemConstraint = ValidateUniqueArrayItemConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)(),
    __metadata("design:paramtypes", [])
], ValidateUniqueArrayItemConstraint);
function ValidateUniqueArrayItem(validationOptions, options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [validationOptions],
            options: options,
            validator: ValidateUniqueArrayItemConstraint
        });
    };
}
//# sourceMappingURL=validate-unique-array-item.js.map