import { IAppResponse } from "../../../server-core/interfaces";
export declare class AppResponse<T extends object | object[]> implements IAppResponse {
    constructor(message: string, data: object | object[] | undefined | T, parameters?: {
        [key: string]: any;
    });
    message: string;
    data: object | object[] | undefined | T;
    parameters: {
        [key: string]: any;
    };
}
