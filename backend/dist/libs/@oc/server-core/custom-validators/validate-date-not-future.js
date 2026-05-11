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
exports.ValidateDateNotFutureConstraint = void 0;
exports.ValidateDateNotFuture = ValidateDateNotFuture;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidateDateNotFutureConstraint = class ValidateDateNotFutureConstraint {
    constructor() { }
    validate(value) {
        if (!value)
            return false;
        const paymentDate = new Date(value);
        if (isNaN(paymentDate.getTime()))
            return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const paymentDateNormalized = new Date(paymentDate);
        paymentDateNormalized.setHours(0, 0, 0, 0);
        return paymentDateNormalized.getTime() <= today.getTime();
    }
    defaultMessage(args) {
        const { message, constraints } = args.constraints[0];
        const language = "en";
        return `${_core_utilities_1.Translation.Translator(language, _core_enums_1.TranslationFile.Error, message || "ERR_NOT_VALID", constraints)}&&&${args.property}`;
    }
};
exports.ValidateDateNotFutureConstraint = ValidateDateNotFutureConstraint;
exports.ValidateDateNotFutureConstraint = ValidateDateNotFutureConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: false }),
    __metadata("design:paramtypes", [])
], ValidateDateNotFutureConstraint);
function ValidateDateNotFuture(validationOptions, options) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: options,
            constraints: [validationOptions],
            validator: ValidateDateNotFutureConstraint
        });
    };
}
//# sourceMappingURL=validate-date-not-future.js.map