import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { IDynamicValidationOptions } from "../interfaces/dynamic-validation-option.interface";
export declare class ValidateOptionalConstraint implements ValidatorConstraintInterface {
    validate(): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateOptional(validationOptions?: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
