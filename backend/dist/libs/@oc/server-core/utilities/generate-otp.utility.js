"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtpNumber = void 0;
class GenerateOtpNumber {
    static generateOtp() {
        const otp = Math.floor(Math.random() * 899999 + 100000);
        return otp.toString();
    }
}
exports.GenerateOtpNumber = GenerateOtpNumber;
//# sourceMappingURL=generate-otp.utility.js.map