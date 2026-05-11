import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User as UserEntity } from "../../database/entities/user.entity";
export declare class AppJwtService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateJWTToken(user: UserEntity, rememberMe?: boolean): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateRefreshToken(user: UserEntity): string;
    verifyToken(token: string): any;
    decodeToken(token: string): any;
}
