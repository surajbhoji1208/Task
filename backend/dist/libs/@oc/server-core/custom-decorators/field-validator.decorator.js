"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredStringField = RequiredStringField;
exports.OptionalStringField = OptionalStringField;
const _core_custom_validators_1 = require("../custom-validators");
const field_type_enum_1 = require("../enums/field-type.enum");
function RequiredStringField(displayName, fieldName) {
    return function (target, propertyName) {
        (0, _core_custom_validators_1.ValidateNotEmpty)({ constraints: { field: displayName } })(target, propertyName);
        (0, _core_custom_validators_1.ValidateType)({ constraints: { field: fieldName || propertyName, type: field_type_enum_1.FieldTypeEnum.String } })(target, propertyName);
    };
}
function OptionalStringField(displayName, fieldName) {
    return function (target, propertyName) {
        (0, _core_custom_validators_1.ValidateOptional)({ constraints: { field: displayName } })(target, propertyName);
        (0, _core_custom_validators_1.ValidateType)({ constraints: { field: fieldName || propertyName, type: field_type_enum_1.FieldTypeEnum.String } })(target, propertyName);
    };
}
//# sourceMappingURL=field-validator.decorator.js.map