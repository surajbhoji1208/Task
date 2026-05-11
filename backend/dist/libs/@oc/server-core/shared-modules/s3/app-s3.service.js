"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AppS3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppS3Service = void 0;
const aws_sdk_1 = require("aws-sdk");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const https = __importStar(require("https"));
let AppS3Service = AppS3Service_1 = class AppS3Service {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AppS3Service_1.name);
        this.S3Config = this.configService.get("aws_s3");
        this.s3Client = this.getS3Client();
    }
    get privateBucketName() {
        return this.S3Config.private_bucket_name;
    }
    getS3Client() {
        return new aws_sdk_1.S3({
            accessKeyId: this.S3Config.access_key_id,
            secretAccessKey: this.S3Config.secret_access_key,
            region: this.S3Config.region,
            httpOptions: {
                agent: new https.Agent({
                    rejectUnauthorized: false
                })
            }
        });
    }
    uploadS3(file, bucket, name, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Uploading file ${name} to bucket ${bucket}`);
            const params = {
                Bucket: bucket,
                Key: name,
                Body: file,
                ContentType: mimeType
            };
            return new Promise((resolve, reject) => {
                this.s3Client.upload(params, (err, data) => {
                    if (err) {
                        this.logger.error(`Error uploading file: ${err.message}`, err.stack);
                        reject(new Error(err.message));
                    }
                    this.logger.debug(`File uploaded successfully: ${data.Location}`);
                    resolve(data);
                });
            });
        });
    }
    deleteFileFromS3(key, bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Deleting file ${key} from bucket ${bucketName}`);
            const params = {
                Bucket: bucketName,
                Key: key
            };
            this.s3Client.deleteObject(params, (err) => {
                if (err)
                    this.logger.error(`Error deleting file: ${err.message}`, err.stack);
            });
        });
    }
    generatePresignedUrl(key_1, expires_1, bucketName_1) {
        return __awaiter(this, arguments, void 0, function* (key, expires, bucketName, contentType = null) {
            this.logger.debug(`Generating presigned URL for ${key} in bucket ${bucketName}`);
            const params = {
                Bucket: bucketName,
                Key: key,
                Expires: expires
            };
            if (contentType != null) {
                params["ResponseContentDisposition"] = `${contentType}; filename="${key}"`;
            }
            return this.s3Client.getSignedUrlPromise("getObject", params);
        });
    }
};
exports.AppS3Service = AppS3Service;
exports.AppS3Service = AppS3Service = AppS3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppS3Service);
//# sourceMappingURL=app-s3.service.js.map