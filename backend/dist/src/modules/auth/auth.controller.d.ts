import { AuthResponseDto, AuthService, ChangePasswordRequestDto, ForgotPasswordRequestDto, LoginRequestDto, OtpLeftTimeRequestDto, OtpLeftTimeResponseDto, OtpVerifyRequestDto, RegisterRequestDto, ResendOtpRequestDto, ResetPasswordRequestDto, UserResponseDto } from "../../../libs/@oc/business-core/modules";
import { AppResponse } from "../../../libs/@oc/business-core/dto";
import { User } from "../../../libs/@oc/server-core/database";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginRequestDto): Promise<AppResponse<AuthResponseDto>>;
    register(registerDto: RegisterRequestDto): Promise<AppResponse<{}>>;
    otpVerify(otpVerifyDto: OtpVerifyRequestDto): Promise<AppResponse<AuthResponseDto>>;
    getOtpLeftTime(data: OtpLeftTimeRequestDto): Promise<AppResponse<OtpLeftTimeResponseDto>>;
    resendOtp(resendOtpDto: ResendOtpRequestDto): Promise<AppResponse<{}>>;
    changePassword(changePasswordDto: ChangePasswordRequestDto, user: User): Promise<AppResponse<{}>>;
    forgotPassword(forgotPasswordDto: ForgotPasswordRequestDto): Promise<AppResponse<{}>>;
    resetPassword(resetPasswordDto: ResetPasswordRequestDto): Promise<AppResponse<{}>>;
    getProfile(user: User): AppResponse<UserResponseDto>;
}
