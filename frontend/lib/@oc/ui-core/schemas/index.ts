import * as yup from 'yup';

// #region Common Validation Constants
export const CommonValidationConstants = {
  EmailMaxLength: 255,
  PasswordMinLength: 8,
  PasswordMaxLength: 100,
  NameMinLength: 1,
  NameMaxLength: 100,
  PhoneMinLength: 7,
  PhoneMaxLength: 20,
  OtpLength: 6,
  SearchTextMaxLength: 255,
  PageSizeDefault: 10,
  PageSizeMax: 100,
} as const;
// #endregion

// #region Common Validation Schemas
export const emailValidation = yup
  .string()
  .email('Please enter a valid email address')
  .max(
    CommonValidationConstants.EmailMaxLength,
    `Email cannot exceed ${CommonValidationConstants.EmailMaxLength} characters`
  )
  .required('Email is required');

export const passwordValidation = yup
  .string()
  .min(
    CommonValidationConstants.PasswordMinLength,
    `Password must be at least ${CommonValidationConstants.PasswordMinLength} characters`
  )
  .max(
    CommonValidationConstants.PasswordMaxLength,
    `Password cannot exceed ${CommonValidationConstants.PasswordMaxLength} characters`
  )
  .required('Password is required');

export const nameValidation = yup
  .string()
  .min(
    CommonValidationConstants.NameMinLength,
    'Name cannot be empty'
  )
  .max(
    CommonValidationConstants.NameMaxLength,
    `Name cannot exceed ${CommonValidationConstants.NameMaxLength} characters`
  )
  .required('Name is required');

export const phoneValidation = yup
  .string()
  .min(
    CommonValidationConstants.PhoneMinLength,
    `Phone number must be at least ${CommonValidationConstants.PhoneMinLength} digits`
  )
  .max(
    CommonValidationConstants.PhoneMaxLength,
    `Phone number cannot exceed ${CommonValidationConstants.PhoneMaxLength} digits`
  );

export const otpValidation = yup
  .string()
  .length(CommonValidationConstants.OtpLength, 'OTP must be exactly 6 digits')
  .matches(/^\d+$/, 'OTP must contain only numbers')
  .required('OTP is required');

export const idValidation = yup
  .string()
  .uuid('Invalid ID format')
  .required('ID is required');

export const searchTextValidation = yup
  .string()
  .max(
    CommonValidationConstants.SearchTextMaxLength,
    `Search text cannot exceed ${CommonValidationConstants.SearchTextMaxLength} characters`
  );
// #endregion
