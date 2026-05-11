import { Repository } from "typeorm";
import { Otp } from "../../../server-core/database";
export declare class OtpRepository extends Repository<Otp> {
    constructor(repository: Repository<Otp>);
}
