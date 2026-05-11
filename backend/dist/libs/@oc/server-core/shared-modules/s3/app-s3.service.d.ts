import { S3 } from "aws-sdk";
import { ConfigService } from "@nestjs/config";
interface S3ConfigInterface {
    access_key_id: string;
    secret_access_key: string;
    private_bucket_name: string;
    region: string;
}
export declare class AppS3Service {
    private readonly configService;
    readonly S3Config: S3ConfigInterface;
    private readonly s3Client;
    private readonly logger;
    constructor(configService: ConfigService);
    get privateBucketName(): string;
    getS3Client(): S3;
    uploadS3(file: any, bucket: string, name: string, mimeType: string): Promise<unknown>;
    deleteFileFromS3(key: string, bucketName: string): Promise<void>;
    generatePresignedUrl(key: string, expires: number, bucketName: string, contentType?: any): Promise<string>;
}
export {};
