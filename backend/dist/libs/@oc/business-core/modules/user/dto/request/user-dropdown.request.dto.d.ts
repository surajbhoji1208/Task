import { CommonSearchRequestDto } from "../../../../dto";
import { UserTypeEnum } from "../../../../../server-core/enums";
export declare class UserDropdownRequestDto extends CommonSearchRequestDto {
    userType?: UserTypeEnum;
}
