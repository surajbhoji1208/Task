'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@core/store/hooks';
import { setUser } from '@core/store/slices/authSlice';
import {
  useLogin,
  useRegister,
  useVerifyOtp,
  useForgotPassword,
  useResetPassword,
  loginSchema,
  registerSchema,
  otpVerifySchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  authFormFunctions,
} from '@ui-module/auth';

// #region Login Form Hook
export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      if (response.data.otpRequired) {
        router.push(`/otp-verify?email=${encodeURIComponent(data.email)}&type=LOGIN`);
        return;
      }
      authFormFunctions.handleLoginSuccess();
      router.push('/dashboard');
    } catch {
      // Error handled by mutation hook
    }
  });

  return {
    control,
    errors,
    isLoading: loginMutation.isPending,
    handleSubmit: onSubmit,
  };
};
// #endregion

// #region Register Form Hook
export const useRegisterForm = () => {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { confirmPassword: _, ...registerData } = data;
      await registerMutation.mutateAsync(registerData);
      authFormFunctions.handleRegisterSuccess();
      router.push(`/otp-verify?email=${encodeURIComponent(data.email)}&type=REGISTER`);
    } catch {
      // Error handled by mutation hook
    }
  });

  return {
    control,
    errors,
    isLoading: registerMutation.isPending,
    handleSubmit: onSubmit,
  };
};
// #endregion

// #region OTP Verify Form Hook
export const useOtpVerifyForm = (email: string, otpType: string) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const verifyMutation = useVerifyOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpVerifySchema),
    defaultValues: { otp: '', email, otpType },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await verifyMutation.mutateAsync(data);
      if (response.data.user) {
        dispatch(setUser(response.data.user));
      }
      authFormFunctions.handleOtpSuccess();
      router.push('/dashboard');
    } catch {
      // Error handled by mutation hook
    }
  });

  return {
    control,
    errors,
    isLoading: verifyMutation.isPending,
    handleSubmit: onSubmit,
  };
};
// #endregion

// #region Forgot Password Form Hook
export const useForgotPasswordForm = () => {
  const router = useRouter();
  const forgotMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotMutation.mutateAsync({ ...data, platform: 'front' });
      authFormFunctions.handleForgotPasswordSuccess();
      router.push(`/otp-verify?email=${encodeURIComponent(data.email)}&type=FORGOT_PASSWORD`);
    } catch {
      // Error handled by mutation hook
    }
  });

  return {
    control,
    errors,
    isLoading: forgotMutation.isPending,
    handleSubmit: onSubmit,
  };
};
// #endregion

// #region Reset Password Form Hook
export const useResetPasswordForm = (email: string) => {
  const router = useRouter();
  const resetMutation = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { email, newPassword: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetMutation.mutateAsync({ email: data.email, newPassword: data.newPassword });
      authFormFunctions.handleResetPasswordSuccess();
      router.push('/login');
    } catch {
      // Error handled by mutation hook
    }
  });

  return {
    control,
    errors,
    isLoading: resetMutation.isPending,
    handleSubmit: onSubmit,
  };
};
// #endregion
