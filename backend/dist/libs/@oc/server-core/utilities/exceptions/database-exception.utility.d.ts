import { QueryFailedError } from "typeorm";
export declare const handleDatabaseError: (exception: QueryFailedError) => any;
export declare const extractFieldFromDetail: (detail: string) => string | null;
export declare const extractColumnFromDetail: (detail: string) => string | null;
