"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidatorModule = void 0;
const validate_active_record_1 = require("./validate-active-record");
const validate_alpha_numeric_1 = require("./validate-alpha-numeric");
const validate_date_not_future_1 = require("./validate-date-not-future");
const validate_email_1 = require("./validate-email");
const validate_enum_type_1 = require("./validate-enum-type");
const validate_max_length_1 = require("./validate-max-length");
const validate_max_value_1 = require("./validate-max-value");
const validate_min_length_1 = require("./validate-min-length");
const validate_min_value_1 = require("./validate-min-value");
const validate_not_empty_1 = require("./validate-not-empty");
const validate_check_only_space_1 = require("./validate-check-only-space");
const validate_type_1 = require("./validate-type");
const validate_unique_array_item_1 = require("./validate-unique-array-item");
const validate_optional_1 = require("./validate-optional");
const common_1 = require("@nestjs/common");
let CustomValidatorModule = class CustomValidatorModule {
};
exports.CustomValidatorModule = CustomValidatorModule;
exports.CustomValidatorModule = CustomValidatorModule = __decorate([
    (0, common_1.Module)({
        providers: [
            validate_active_record_1.ValidateActiveRecordConstraint,
            validate_check_only_space_1.ValidateOnlySpaceConstraint,
            validate_type_1.ValidateTypeConstraint,
            validate_date_not_future_1.ValidateDateNotFutureConstraint,
            validate_email_1.ValidateEmailConstraint,
            validate_alpha_numeric_1.ValidateAlphaNumericConstraint,
            validate_unique_array_item_1.ValidateUniqueArrayItemConstraint,
            validate_enum_type_1.ValidateEnumTypeConstraint,
            validate_not_empty_1.ValidateNotEmptyConstraint,
            validate_max_length_1.ValidateMaxLengthConstraint,
            validate_min_length_1.ValidateMinLengthConstraint,
            validate_max_value_1.ValidateMaxValueConstraint,
            validate_min_value_1.ValidateMinValueConstraint,
            validate_optional_1.ValidateOptionalConstraint
        ],
        exports: [
            validate_active_record_1.ValidateActiveRecordConstraint,
            validate_check_only_space_1.ValidateOnlySpaceConstraint,
            validate_type_1.ValidateTypeConstraint,
            validate_date_not_future_1.ValidateDateNotFutureConstraint,
            validate_email_1.ValidateEmailConstraint,
            validate_alpha_numeric_1.ValidateAlphaNumericConstraint,
            validate_unique_array_item_1.ValidateUniqueArrayItemConstraint,
            validate_enum_type_1.ValidateEnumTypeConstraint,
            validate_not_empty_1.ValidateNotEmptyConstraint,
            validate_max_length_1.ValidateMaxLengthConstraint,
            validate_min_length_1.ValidateMinLengthConstraint,
            validate_max_value_1.ValidateMaxValueConstraint,
            validate_min_value_1.ValidateMinValueConstraint,
            validate_optional_1.ValidateOptionalConstraint
        ]
    })
], CustomValidatorModule);
//# sourceMappingURL=custom-validator.module.js.map