import { IDynamicValidationOptions } from "../interfaces";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class ValidateOnlySpaceConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateOnlySpace(validationOptions: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
