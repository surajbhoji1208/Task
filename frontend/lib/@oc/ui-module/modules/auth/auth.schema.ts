import * as yup from 'yup';
import {
  emailValidation,
  passwordValidation,
  nameValidation,
  otpValidation,
  CommonValidationConstants,
} from '@ui-core-schema';

// #region Auth Constants
export const AuthConstants = {
  PasswordMinLength: CommonValidationConstants.PasswordMinLength,
  PasswordMaxLength: CommonValidationConstants.PasswordMaxLength,
  NameMinLength: CommonValidationConstants.NameMinLength,
  NameMaxLength: CommonValidationConstants.NameMaxLength,
} as const;
// #endregion

// #region Login Schema
export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: yup.boolean().optional(),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
// #endregion

// #region Register Schema
export const registerSchema = yup.object().shape({
  firstName: nameValidation
    .min(AuthConstants.NameMinLength, 'First name cannot be empty')
    .max(AuthConstants.NameMaxLength, `First name cannot exceed ${AuthConstants.NameMaxLength} characters`),
  lastName: nameValidation
    .min(AuthConstants.NameMinLength, 'Last name cannot be empty')
    .max(AuthConstants.NameMaxLength, `Last name cannot exceed ${AuthConstants.NameMaxLength} characters`),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  dateOfBirth: yup.string().optional(),
  phoneNumber: yup.string().optional(),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
// #endregion

// #region OTP Verify Schema
export const otpVerifySchema = yup.object().shape({
  otp: otpValidation,
  email: emailValidation,
  otpType: yup.string().required(),
});

export type OtpVerifyFormValues = yup.InferType<typeof otpVerifySchema>;
// #endregion

// #region Forgot Password Schema
export const forgotPasswordSchema = yup.object().shape({
  email: emailValidation,
});

export type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>;
// #endregion

// #region Reset Password Schema
export const resetPasswordSchema = yup.object().shape({
  email: emailValidation,
  newPassword: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export type ResetPasswordFormValues = yup.InferType<typeof resetPasswordSchema>;
// #endregion

// #region Change Password Schema
export const changePasswordSchema = yup.object().shape({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export type ChangePasswordFormValues = yup.InferType<typeof changePasswordSchema>;
// #endregion
