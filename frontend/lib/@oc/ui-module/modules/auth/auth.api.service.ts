import { apiClient } from '@ui-core-api';
import type {
  LoginDto,
  RegisterDto,
  OtpVerifyDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  ResendOtpDto,
  AuthLoginResponse,
  AuthRegisterResponse,
  AuthOtpVerifyResponse,
  AuthProfileResponse,
} from './auth.types';

// #region Auth API Constants
const AUTH_BASE_URL = '/auth';
// #endregion

// #region Auth API Service
export const authApiService = {
  async login(data: LoginDto): Promise<AuthLoginResponse> {
    const response = await apiClient.post<AuthLoginResponse>(`${AUTH_BASE_URL}/login`, data);
    return response.data;
  },

  async register(data: RegisterDto): Promise<AuthRegisterResponse> {
    const response = await apiClient.post<AuthRegisterResponse>(`${AUTH_BASE_URL}/register`, data);
    return response.data;
  },

  async verifyOtp(data: OtpVerifyDto): Promise<AuthOtpVerifyResponse> {
    const response = await apiClient.post<AuthOtpVerifyResponse>(`${AUTH_BASE_URL}/otp-verify`, data);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordDto): Promise<AuthRegisterResponse> {
    const response = await apiClient.post<AuthRegisterResponse>(`${AUTH_BASE_URL}/forgot-password`, data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordDto): Promise<AuthRegisterResponse> {
    const response = await apiClient.post<AuthRegisterResponse>(`${AUTH_BASE_URL}/reset-password`, data);
    return response.data;
  },

  async changePassword(data: ChangePasswordDto): Promise<AuthRegisterResponse> {
    const response = await apiClient.put<AuthRegisterResponse>(`${AUTH_BASE_URL}/change-password`, data);
    return response.data;
  },

  async getProfile(): Promise<AuthProfileResponse> {
    const response = await apiClient.get<AuthProfileResponse>(`${AUTH_BASE_URL}/profile`);
    return response.data;
  },

  async resendOtp(data: ResendOtpDto): Promise<AuthRegisterResponse> {
    const response = await apiClient.post<AuthRegisterResponse>(`${AUTH_BASE_URL}/resend-otp`, data);
    return response.data;
  },
};
// #endregion
