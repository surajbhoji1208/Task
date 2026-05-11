import { Repository } from "typeorm";
import { ResetPasswordToken } from "../../../server-core/database";
export declare class ResetPasswordTokenRepository extends Repository<ResetPasswordToken> {
    constructor(repository: Repository<ResetPasswordToken>);
}
