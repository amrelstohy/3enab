const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../users/user.model");
const {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
  ConflictError,
} = require("../../utils/errors");
const sendEmail = require("../../utils/email");
// const { sendSMS } = require("../../utils/sms");
const {
  generateRefreshToken,
  generateAccessToken,
  generateEmailVerificationToken,
} = require("../../utils/tokensGenerator");
const OTPGenerator = require("../../utils/OTPGenerator");
const { sanitizeUser } = require("../users/user.sanitizers");

// Register service
const register = async ({ email, password, name, phone }) => {
  const phoneExists = await User.findOne({ phone });
  console.log(phoneExists);
  if (phoneExists) {
    throw new ConflictError("Phone number already exists");
  }
  console.log(!phoneExists);

  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new ConflictError("Email already exists");
    }
  }

  const phoneVerificationOTP = OTPGenerator(4);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email: email || null,
    password: hashedPassword,
    name,
    phone,
    phoneVerificationOTP,
    phoneVerificationOTPExpires: new Date(Date.now() + 10 * 60 * 1000),
  });

  const refreshToken = generateRefreshToken(user._id);
  const accessToken = generateAccessToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

// Login service
const login = async ({ phone, password }) => {
  const user = await User.findOne({ phone });

  if (!user) {
    throw new NotFoundError("Invalid phone number");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid password");
  }

  const refreshToken = generateRefreshToken(user._id);
  const accessToken = generateAccessToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

// Logout service
const logout = async (user) => {
  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.refreshToken = null;
  await user.save();
};

// Send email verification mail
const sendEmailVerificationMail = async (user) => {
  if (!user) {
    throw new NotFoundError("Email is required");
  }

  if (!user.email) {
    throw new NotFoundError("This user does not have an email");
  }

  const emailVerificationToken = generateEmailVerificationToken(user._id);

  await sendEmail({
    to: user.email,
    subject: "Email Verification",
    text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`,
  });
};

// Verify email
const verifyEmail = async (token) => {
  if (!token) {
    throw new NotFoundError("Missing token");
  }

  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    throw new UnauthorizedError("Invalid verification token");
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
};

// Send phone OTP
const sendPhoneOtp = async (user) => {
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const phoneVerificationOTP = OTPGenerator(4);
  const phoneVerificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      phoneVerificationOTP,
      phoneVerificationOTPExpires,
    }
  );

  await sendSMS({
    to: phoneNumber,
    message: `Your verification code is: ${otp}. Valid for 10 minutes.`,
  });
};

// Verify phone OTP
const verifyPhoneOtp = async (user, otp) => {
  if (!user || !otp) {
    throw new NotFoundError("User or OTP not found");
  }

  if (user.phoneVerificationOTP !== otp) {
    throw new UnauthorizedError("Invalid OTP");
  }

  if (user.phoneVerificationOTPExpires < new Date()) {
    throw new UnauthorizedError("OTP expired");
  }

  user.isPhoneVerified = true;
  user.phoneVerificationOTP = null;
  user.phoneVerificationOTPExpires = null;
  await user.save();

  return user;
};

// Send reset password OTP
const sendResetPasswordOtp = async (phone) => {
  const user = await User.findOne({ phone });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const otp = OTPGenerator(4);
  const resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = resetPasswordOTPExpires;
  await user.save();

  // await sendEmail({
  //   to: email,
  //   subject: "Password Reset Request",
  //   text: `Your password reset code is: ${otp}. Valid for 10 minutes.`,
  // });
};

// Verify reset password OTP
const verifyResetPasswordOtp = async (phone, otp) => {
  const user = await User.findOne({
    phone,
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (user.resetPasswordOTP !== otp) {
    throw new UnauthorizedError("Invalid OTP");
  }

  if (user.resetPasswordOTPExpires < new Date()) {
    throw new UnauthorizedError("OTP expired");
  }

  const resetPasswordToken = generateResetPasswordToken(user._id);

  user.resetPasswordTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  user.resetPasswordOTP = null;
  user.resetPasswordOTPExpires = null;
  await user.save();

  return resetPasswordToken;
};

// Reset password
const resetPassword = async (user, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.resetPasswordTokenExpires = null;
  user.password = hashedPassword;
  await user.save();
};

const refreshToken = async (token) => {
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
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
