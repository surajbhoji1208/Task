import { Repository } from "typeorm";
import { Token } from "../../../server-core/database";
export declare class TokenRepository extends Repository<Token> {
    constructor(repository: Repository<Token>);
}
