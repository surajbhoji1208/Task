import { AppResponse } from "../../dto";
import { AppJwtService, AppMailerService } from "../../../server-core/shared-modules";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { AuthRepository } from "./auth.repository";
import { User } from "../../../server-core/database";
import { ChangePasswordRequestDto, ForgotPasswordRequestDto, LoginRequestDto, OtpLeftTimeRequestDto, OtpVerifyRequestDto, RegisterRequestDto, ResendOtpRequestDto, ResetPasswordRequestDto } from "./dto/request";
import { AuthResponseDto, OtpLeftTimeResponseDto } from "./dto/response/auth-response.dto";
export declare class AuthService {
    #private;
    private readonly userService;
    private readonly authRepository;
    private readonly appJwtService;
    private readonly configService;
    private readonly appMailerService;
    constructor(userService: UserService, authRepository: AuthRepository, appJwtService: AppJwtService, configService: ConfigService, appMailerService: AppMailerService);
    loginUser(loginDto: LoginRequestDto): Promise<AppResponse<AuthResponseDto>>;
    register(registerDto: RegisterRequestDto): Promise<AppResponse<{}>>;
    otpVerify(otpVerifyDto: OtpVerifyRequestDto): Promise<AppResponse<AuthResponseDto>>;
    getOtpLeftTime(data: OtpLeftTimeRequestDto): Promise<AppResponse<OtpLeftTimeResponseDto>>;
    resendOtp(resendOtpDto: ResendOtpRequestDto): Promise<AppResponse<{}>>;
    changePassword(changePasswordDto: ChangePasswordRequestDto, user: User): Promise<AppResponse<{}>>;
    forgotPassword(forgotPasswordDto: ForgotPasswordRequestDto): Promise<AppResponse<{}>>;
    resetPassword(resetPasswordDto: ResetPasswordRequestDto): Promise<AppResponse<{}>>;
}
