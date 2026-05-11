import { toast } from 'react-toastify';
import type { ApiError } from '@ui-core-types';

// #region Auth Form Functions
export const authFormFunctions = {
  handleLoginSuccess: () => {
    toast.success('Login successful! Welcome back.');
  },

  handleRegisterSuccess: () => {
    toast.success('Registration successful! Please verify your email with the OTP sent.');
  },

  handleOtpSuccess: () => {
    toast.success('OTP verified successfully!');
  },

  handleForgotPasswordSuccess: () => {
    toast.success('Password reset OTP sent to your email.');
  },

  handleResetPasswordSuccess: () => {
    toast.success('Password reset successfully! Please login with your new password.');
  },

  handleChangePasswordSuccess: () => {
    toast.success('Password changed successfully!');
  },

  handleFormError: (error: ApiError) => {
    const message = error?.response?.data?.message || 'An error occurred. Please try again.';
    toast.error(message);
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      document.cookie = 'auth_token=; path=/; max-age=0; samesite=strict';
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  },
};
// #endregion
