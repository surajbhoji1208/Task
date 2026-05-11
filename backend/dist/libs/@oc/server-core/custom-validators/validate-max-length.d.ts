import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces";
export declare class ValidateMaxLengthConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateMaxLength(length: number, validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
