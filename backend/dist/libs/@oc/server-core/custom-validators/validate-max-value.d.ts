import { IDynamicValidationOptions } from "../interfaces";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class ValidateMaxValueConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateMaxValue(length: number, validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
