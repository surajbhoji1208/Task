"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportHistoryEntityConstant = exports.ReviewEntityConstant = exports.ProductEntityConstant = exports.CategoryEntityConstant = exports.OtpEntityConstant = exports.UserEntityConstant = void 0;
exports.UserEntityConstant = {
    FirstNameMaxLength: 100,
    LastNameMaxLength: 100,
    EmailMaxLength: 50,
    PhoneNumberMaxLength: 15,
    PasswordMaxLength: 20,
    PasswordMinLength: 6,
    EncryptedPasswordMaxLength: 250,
    SocialAccountIdMaxLength: 255,
    SaltMaxLength: 50,
    RefreshTokenMaxLength: 255,
    IdProofAllowedExtensions: ["jpg", "jpeg", "png", "pdf"]
};
exports.OtpEntityConstant = {
    OtpLength: 6
};
exports.CategoryEntityConstant = {
    NameMaxLength: 255
};
exports.ProductEntityConstant = {
    ExternalIdMaxLength: 100,
    NameMaxLength: 1000,
    CategoryPathMaxLength: 1000,
    AboutProductMaxLength: 5000
};
exports.ReviewEntityConstant = {
    UserNameMaxLength: 500,
    ReviewTitleMaxLength: 1000
};
exports.ImportHistoryEntityConstant = {
    FileNameMaxLength: 255,
    ErrorMessageMaxLength: 2000
};
//# sourceMappingURL=entity.constant.js.map