"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseStatus = ApiResponseStatus;
const _business_core_dto_1 = require("../../business-core/dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const internal_server_error_response_dto_1 = require("../../business-core/dto/common-dto/error/internal-server-error.response.dto");
const unauthorized_response_dto_1 = require("../../business-core/dto/common-dto/error/unauthorized.response.dto");
function ApiResponseStatus(description, statuses, module, responseDto, genericType) {
    const decorators = [
        (0, swagger_1.ApiOperation)({ summary: description }),
        (0, swagger_1.ApiExtraModels)(internal_server_error_response_dto_1.InternalServerErrorResponseDto, unauthorized_response_dto_1.UnauthorizedResponseDto)
    ];
    if (responseDto) {
        decorators.push((0, swagger_1.ApiExtraModels)(responseDto));
        if (genericType) {
            decorators.push((0, swagger_1.ApiExtraModels)(genericType));
        }
    }
    const commonErrorStatuses = [common_1.HttpStatus.INTERNAL_SERVER_ERROR, common_1.HttpStatus.SERVICE_UNAVAILABLE];
    if (!statuses || statuses.length === 0) {
        statuses = [
            common_1.HttpStatus.OK,
            common_1.HttpStatus.CREATED,
            common_1.HttpStatus.NO_CONTENT,
            common_1.HttpStatus.BAD_REQUEST,
            common_1.HttpStatus.UNAUTHORIZED,
            common_1.HttpStatus.FORBIDDEN,
            common_1.HttpStatus.NOT_FOUND,
            common_1.HttpStatus.CONFLICT,
            common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            ...commonErrorStatuses
        ];
    }
    else {
        commonErrorStatuses.forEach((err) => {
            if (!statuses.includes(err))
                statuses.push(err);
        });
    }
    const responseHandlers = {
        [common_1.HttpStatus.OK]: () => {
            if (!responseDto) {
                return decorators.push((0, swagger_1.ApiResponse)({
                    status: common_1.HttpStatus.OK,
                    type: _business_core_dto_1.AppResponse,
                    description: `Successfully retrieved ${module} data`
                }));
            }
            let dataSchema = {
                $ref: (0, swagger_1.getSchemaPath)(responseDto)
            };
            if (genericType) {
                dataSchema = {
                    type: "object",
                    allOf: [
                        { $ref: (0, swagger_1.getSchemaPath)(responseDto) },
                        {
                            properties: {
                                results: {
                                    type: "array",
                                    items: { $ref: (0, swagger_1.getSchemaPath)(genericType) }
                                }
                            }
                        }
                    ]
                };
            }
            decorators.push((0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                schema: {
                    allOf: [{ $ref: (0, swagger_1.getSchemaPath)(_business_core_dto_1.AppResponse) }, { properties: { data: dataSchema } }]
                },
                description: `Successfully retrieved ${module} data`
            }));
        },
        [common_1.HttpStatus.CREATED]: () => {
            if (!responseDto) {
                return decorators.push((0, swagger_1.ApiResponse)({
                    status: common_1.HttpStatus.CREATED,
                    type: _business_core_dto_1.AppResponse,
                    description: `Successfully created ${module}`
                }));
            }
            decorators.push((0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CREATED,
                schema: {
                    allOf: [
                        { $ref: (0, swagger_1.getSchemaPath)(_business_core_dto_1.AppResponse) },
                        {
                            properties: {
                                data: { $ref: (0, swagger_1.getSchemaPath)(responseDto) }
                            }
                        }
                    ]
                },
                description: `Successfully created ${module}`
            }));
        },
        [common_1.HttpStatus.NO_CONTENT]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NO_CONTENT,
            description: `${module} data not found`
        })),
        [common_1.HttpStatus.BAD_REQUEST]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: "Malformed request or invalid parameters"
        })),
        [common_1.HttpStatus.UNAUTHORIZED]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNAUTHORIZED,
            type: unauthorized_response_dto_1.UnauthorizedResponseDto,
            description: "Invalid or missing authentication credentials"
        })),
        [common_1.HttpStatus.FORBIDDEN]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.FORBIDDEN,
            description: "Permission denied"
        })),
        [common_1.HttpStatus.NOT_FOUND]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: `The requested ${module} was not found`
        })),
        [common_1.HttpStatus.CONFLICT]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.CONFLICT,
            description: `A ${module} with the same identifier already exists`
        })),
        [common_1.HttpStatus.UNPROCESSABLE_ENTITY]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            description: "Validation or semantic processing failed"
        })),
        [common_1.HttpStatus.GATEWAY_TIMEOUT]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.GATEWAY_TIMEOUT,
            description: "Upstream server timeout"
        })),
        [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            type: internal_server_error_response_dto_1.InternalServerErrorResponseDto,
            description: "Unexpected server error"
        })),
        [common_1.HttpStatus.SERVICE_UNAVAILABLE]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.SERVICE_UNAVAILABLE,
            description: "Service temporarily unavailable"
        })),
        [common_1.HttpStatus.NOT_ACCEPTABLE]: () => decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_ACCEPTABLE,
            description: "Content not acceptable based on Accept headers"
        }))
    };
    statuses.forEach((status) => {
        const handler = responseHandlers[status];
        if (handler)
            handler();
        else
            console.warn(`Unsupported status code: ${status}`);
    });
    return (0, common_1.applyDecorators)(...decorators);
}
//# sourceMappingURL=api-response.decorator.js.map