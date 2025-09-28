const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
};

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateEmailVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.EMAIL_VERIFICATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateResetPasswordToken = (userId) => {
  return jwt.sign({ userId }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  generateEmailVerificationToken,
  generateResetPasswordToken,
};
