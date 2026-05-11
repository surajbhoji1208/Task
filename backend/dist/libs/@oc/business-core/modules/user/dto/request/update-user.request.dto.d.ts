import { UserStatus } from "../../../../../server-core/enums";
export declare class UpdateUserRequestDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    age: string;
    status?: UserStatus;
}
