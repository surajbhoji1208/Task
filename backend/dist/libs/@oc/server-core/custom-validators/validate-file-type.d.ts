import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces/dynamic-validation-option.interface";
export declare class ValidateFileTypeConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): any;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateFileType(validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
