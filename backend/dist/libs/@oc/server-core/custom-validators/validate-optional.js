"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateOptionalConstraint = void 0;
exports.ValidateOptional = ValidateOptional;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidateOptionalConstraint = class ValidateOptionalConstraint {
    validate() {
        return true;
    }
    defaultMessage(args) {
        const { message } = args.constraints[0];
        return message || "Field is optional";
    }
};
exports.ValidateOptionalConstraint = ValidateOptionalConstraint;
exports.ValidateOptionalConstraint = ValidateOptionalConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)()
], ValidateOptionalConstraint);
function ValidateOptional(validationOptions, options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [validationOptions || {}],
            options: options,
            validator: ValidateOptionalConstraint
        });
    };
}
//# sourceMappingURL=validate-optional.js.map