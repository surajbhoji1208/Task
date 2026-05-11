import { User } from "../../../server-core/database";
import { UserTypeEnum } from "../../../server-core/enums";
import { Repository } from "typeorm";
import { ListUserRequestDto } from "./dto/request/list-user.request.dto";
export declare class UserRepository extends Repository<User> {
    constructor(repository: Repository<User>);
    findUsers(searchRequest: ListUserRequestDto): Promise<[User[], number]>;
    findByEmail(email: string, userType?: UserTypeEnum): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByEmails(emails: string[]): Promise<Map<string, string>>;
    findDropdown(searchRequest: any): Promise<[Array<{
        id: string;
        name: string;
    }>, number]>;
}
