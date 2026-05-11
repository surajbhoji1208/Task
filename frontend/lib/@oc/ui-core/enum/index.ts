// #region Order Direction Enum
export enum OrderDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
// #endregion

// #region User Role Enum
export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
// #endregion

// #region User Status Enum
export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}
// #endregion

// #region OTP Type Enum
export enum OtpTypeEnum {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}
// #endregion

// #region Import Status Enum
export enum ImportStatusEnum {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
// #endregion
