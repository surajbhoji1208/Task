import { IDynamicValidationOptions } from "../interfaces";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class ValidateUniqueArrayItemConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateUniqueArrayItem(validationOptions?: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
