import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces/dynamic-validation-option.interface";
export declare class ValidateTypeConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateType(validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
