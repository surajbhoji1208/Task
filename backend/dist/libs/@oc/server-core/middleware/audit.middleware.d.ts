import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { AuditContextService } from "../generic-service/audit-context.service";
export declare class AuditMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly auditContextService;
    constructor(jwtService: JwtService, auditContextService: AuditContextService);
    use(req: Request, res: Response, next: NextFunction): void;
    private extractTokenFromHeader;
}
