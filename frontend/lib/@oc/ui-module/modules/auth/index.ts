// #region Auth Types
export type {
  AuthUser,
  AuthTokens,
  AuthResponseDto,
  RegisterDto,
  LoginDto,
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
// #endregion

// #region Auth Schemas
export {
  loginSchema,
  registerSchema,
  otpVerifySchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  AuthConstants,
} from './auth.schema';

export type {
  LoginFormValues,
  RegisterFormValues,
  OtpVerifyFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  ChangePasswordFormValues,
} from './auth.schema';
// #endregion

// #region Auth Hooks
export {
  useLogin,
  useRegister,
  useVerifyOtp,
  useForgotPassword,
  useResetPassword,
  useChangePassword,
  useResendOtp,
  useGetProfile,
  AUTH_QUERY_KEYS,
} from './auth.tanstack.query.hook';
// #endregion

// #region Auth Functions
export { authFormFunctions } from './auth.function.service';
// #endregion
