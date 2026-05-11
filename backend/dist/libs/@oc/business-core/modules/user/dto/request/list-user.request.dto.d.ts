import { CommonSearchRequestDto } from "../../../../dto";
import { UserStatus, UserTypeEnum } from "../../../../../server-core/enums";
export declare class ListUserRequestDto extends CommonSearchRequestDto {
    userType?: UserTypeEnum;
    status?: UserStatus;
    sortBy?: string;
}
