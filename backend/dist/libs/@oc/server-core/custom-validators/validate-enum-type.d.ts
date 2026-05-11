import { IDynamicValidationOptions } from "../interfaces";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class ValidateEnumTypeConstraint implements ValidatorConstraintInterface {
    constructor();
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function ValidateEnumType(types: Object, validationOptions?: IDynamicValidationOptions, options?: ValidationOptions): (object: Object, propertyName: string) => void;
