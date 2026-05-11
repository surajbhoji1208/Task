import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { authApiService } from './auth.api.service';
import type {
  LoginDto,
  RegisterDto,
  OtpVerifyDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  ResendOtpDto,
} from './auth.types';
import type { ApiError } from '@ui-core-types';

// #region Auth Query Keys
export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  profile: () => [...AUTH_QUERY_KEYS.all, 'profile'] as const,
};
// #endregion

// #region Auth Query Hooks
export const useGetProfile = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile(),
    queryFn: () => authApiService.getProfile(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
// #endregion

// #region Auth Mutation Hooks
const setAuthCookie = (token: string) => {
  if (typeof document === 'undefined') return;
  const maxAge = 7 * 24 * 60 * 60;
  document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}; samesite=strict`;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginDto) => authApiService.login(data),
    onSuccess: (response) => {
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        setAuthCookie(response.data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.all });
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Login failed. Please try again.');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterDto) => authApiService.register(data),
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Registration failed. Please try again.');
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: OtpVerifyDto) => authApiService.verifyOtp(data),
    onSuccess: (response) => {
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        setAuthCookie(response.data.accessToken);
      }
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'OTP verification failed.');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordDto) => authApiService.forgotPassword(data),
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Failed to send password reset email.');
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) => authApiService.resetPassword(data),
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Password reset failed. Please try again.');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => authApiService.changePassword(data),
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Password change failed. Please try again.');
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (data: ResendOtpDto) => authApiService.resendOtp(data),
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || 'Failed to resend OTP. Please try again.');
    },
  });
};
// #endregion
