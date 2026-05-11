import { HttpStatus } from "@nestjs/common";
export declare function ApiResponseStatus(description: string, statuses: HttpStatus[], module: string, responseDto?: any, genericType?: any): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
