import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { User } from "./user.entity";
export declare class Token extends BaseModifiableEntityWithoutIdentity {
    id: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    rememberMe: boolean;
    user: User;
    createdAt: Date;
    setUserId(): void;
}
