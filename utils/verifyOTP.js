const { UnauthorizedError } = require("./errors");

const verifyPhoneOTP = (otp, user) => {
  if (otp !== user.phoneVerificationOTP) {
    throw new UnauthorizedError("Invalid OTP");
  }
  if (user.phoneVerificationOTPExpires < new Date()) {
    throw new UnauthorizedError("OTP expired");
  }
  return true;
};

const verifyResetPasswordOTP = (otp, user) => {
  if (otp !== user.resetPasswordOTP) {
    throw new UnauthorizedError("Invalid OTP");
  }
  if (user.resetPasswordOTPExpires < new Date()) {
    throw new UnauthorizedError("OTP expired");
  }
  return true;
};

module.exports = { verifyPhoneOTP, verifyResetPasswordOTP };
