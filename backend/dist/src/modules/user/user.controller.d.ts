import { AppResponse, CommonDropdownResponseDto, CommonSearchResponseDto } from "../../../libs/@oc/business-core/dto";
import { CreateUserRequestDto, ListUserRequestDto, UpdateUserRequestDto, UserDropdownRequestDto, UserResponseDto, UserService } from "../../../libs/@oc/business-core/modules";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(query: ListUserRequestDto): Promise<AppResponse<CommonSearchResponseDto<UserResponseDto>>>;
    getDropdown(query: UserDropdownRequestDto): Promise<AppResponse<CommonSearchResponseDto<CommonDropdownResponseDto>>>;
    findOne(id: string): Promise<AppResponse<UserResponseDto>>;
    create(createUserDto: CreateUserRequestDto): Promise<AppResponse<UserResponseDto>>;
    update(id: string, updateUserDto: UpdateUserRequestDto): Promise<AppResponse<UserResponseDto>>;
    remove(id: string): Promise<AppResponse<{}>>;
}
