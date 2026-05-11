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
exports.ValidateTypeConstraint = void 0;
exports.ValidateType = ValidateType;
const _core_enums_1 = require("../enums");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const field_type_enum_1 = require("../enums/field-type.enum");
const translation_utility_1 = require("../utilities/translation.utility");
let ValidateTypeConstraint = class ValidateTypeConstraint {
    constructor() { }
    validate(value, args) {
        const { type } = args.constraints[0].constraints;
        if (value) {
            switch (type) {
                case field_type_enum_1.FieldTypeEnum.String:
                    return (0, class_validator_1.isString)(value);
                case field_type_enum_1.FieldTypeEnum.Number:
                    return (0, class_validator_1.isNumber)(value);
                case field_type_enum_1.FieldTypeEnum.NumberString:
                    return (0, class_validator_1.isNumberString)(value);
                case field_type_enum_1.FieldTypeEnum.Boolean:
                    return (0, class_validator_1.isBoolean)(value);
                case field_type_enum_1.FieldTypeEnum.BooleanString:
                    return (0, class_validator_1.isBooleanString)(value);
                case field_type_enum_1.FieldTypeEnum.Date:
                    return (0, class_validator_1.isDate)(value);
                case field_type_enum_1.FieldTypeEnum.DateString:
                    return (0, class_validator_1.isDateString)(value);
                case field_type_enum_1.FieldTypeEnum.UUID:
                    return (0, class_validator_1.isUUID)(value);
                case field_type_enum_1.FieldTypeEnum.Array:
                    return (0, class_validator_1.isArray)(value);
                default:
                    return true;
            }
        }
        else {
            return true;
        }
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        return `${translation_utility_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_TYPE", constraints)}&&&${args.property}`;
    }
};
exports.ValidateTypeConstraint = ValidateTypeConstraint;
exports.ValidateTypeConstraint = ValidateTypeConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)(),
    __metadata("design:paramtypes", [])
], ValidateTypeConstraint);
function ValidateType(validationOptions, options) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions],
            validator: ValidateTypeConstraint
        });
    };
}
//# sourceMappingURL=validate-type.js.map