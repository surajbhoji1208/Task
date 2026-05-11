import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces/dynamic-validation-option.interface";
export declare class ValidateAlphaNumericConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateAlphaNumeric(validationOptions?: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
