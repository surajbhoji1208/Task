import type { ApiResponse } from '@ui-core-response';

// #region Auth Entity Types
export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  status: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  otpRequired?: boolean;
}

export interface AuthResponseDto extends AuthTokens {
  user?: AuthUser;
}
// #endregion

// #region Auth DTO Types
export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  age?: string;
  phoneNumber?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface OtpVerifyDto {
  email: string;
  otp: string;
  otpType: string;
}

export interface ForgotPasswordDto {
  email: string;
  platform?: string;
}

export interface ResetPasswordDto {
  email: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ResendOtpDto {
  email: string;
  otpType: string;
}
// #endregion

// #region Auth API Response Types
export interface AuthLoginResponse extends ApiResponse<AuthResponseDto> {}
export interface AuthRegisterResponse extends ApiResponse<{ message: string }> {}
export interface AuthOtpVerifyResponse extends ApiResponse<AuthResponseDto> {}
export interface AuthProfileResponse extends ApiResponse<AuthUser> {}
// #endregion
