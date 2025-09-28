const authService = require("./auth.service");

// Register controller
const register = async (req, res) => {
  const data = await authService.register(req.body);
  res
    .status(201)
    .json({ status: "success", message: "User registered successfully", data });
};

// Login controller
const login = async (req, res) => {
  const data = await authService.login(req.body);
  res
    .status(200)
    .json({ status: "success", message: "User logged in successfully", data });
};

const logout = async (req, res) => {
  await authService.logout(req.user);
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

// Send email verification mail
const sendEmailVerificationMail = async (req, res) => {
  await authService.sendEmailVerificationMail(req.user);

  res.status(200).json({
    status: "success",
    message: "Email verification mail sent successfully",
  });
};

// Verify email
const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const data = await authService.verifyEmail(token);
  res
    .status(200)
    .json({ status: "success", message: "Email verified successfully", data });
};

const sendPhoneOtp = async (req, res) => {
  await authService.sendPhoneOtp(req.user);

  res.status(200).json({
    status: "success",
    message: "Phone OTP sent successfully",
  });
};

// Verify phone OTP
const verifyPhoneOtp = async (req, res) => {
  const { otp } = req.body;

  const userUpdated = await authService.verifyPhoneOtp(req.user, otp);
  res.status(200).json({
    status: "success",
    message: "Phone OTP verified successfully",
    data: { user: sanitizeUser(userUpdated) },
  });
};

// Send reset password OTP
const sendResetPasswordOtp = async (req, res) => {
  const { phone } = req.body;

  await authService.sendResetPasswordOtp(phone);

  res.status(200).json({
    status: "success",
    message: "Reset password OTP sent successfully",
  });
};

// Verify reset password OTP
const verifyResetPasswordOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const resetPasswordToken = await authService.verifyResetPasswordOtp(
    phone,
    otp
  );
  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
    data: { resetPasswordToken },
  });
};

// Reset password
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  await authService.resetPassword(req.user, newPassword);
  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
};

// Refresh token
const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const refreshAndAccessToken = await authService.refreshToken(refreshToken);
  res.status(200).json({
    status: "success",
    message: "Token refreshed successfully",
    data: { refreshAndAccessToken },
  });
};

module.exports = {
  register,
  login,
  logout,
  sendEmailVerificationMail,
  verifyEmail,
  sendPhoneOtp,
  verifyPhoneOtp,
  sendResetPasswordOtp,
  verifyResetPasswordOtp,
  resetPassword,
  refreshToken,
};
