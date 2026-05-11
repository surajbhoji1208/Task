import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class AllHttpExceptionFilter implements ExceptionFilter {
    #private;
    private readonly configService;
    constructor(configService: ConfigService);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
    filterResponse(response: any, lang?: string): Promise<any[]>;
}
