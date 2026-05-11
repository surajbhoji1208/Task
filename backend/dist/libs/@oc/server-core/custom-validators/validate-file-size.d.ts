import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces/dynamic-validation-option.interface";
export declare class ValidateFileSizeConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateFileSize(validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
