const { UnauthorizedError } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const User = require('../features/users/user.model');
require('dotenv').config();
const allowedUrls = [
  '/api/v1/auth/send-phone-otp',
  '/api/v1/auth/verify-phone-otp',
  '/api/v1/auth/send-reset-password-otp',
  '/api/v1/auth/verify-reset-password-otp',
  '/api/v1/auth/reset-password',
  '/api/v1/auth/logout',
  '/api/v1/users/me',
  '/api/v1/vendor/users/me',
  '/api/v1/delivery/users/me',
  '/api/v1/admin/users/me',
  '/api/v1/delivery/users/me',
  '/api/v1/fcm-token',
  '/api/v1/vendor/fcm-token',
  '/api/v1/delivery/fcm-token',
  '/api/v1/admin/fcm-token',
];

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Missing token');
  }

  let userId;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  if (!user.refreshToken) {
    throw new UnauthorizedError('This user is not logged in');
  }

  if (user.type !== req.appType && user.type !== 'admin') {
    throw new UnauthorizedError('This user is not allowed to access this app');
  }

  if (!allowedUrls.includes(req.originalUrl)) {
    if (user.isPhoneVerified === false) {
      throw new UnauthorizedError('Phone number is not verified');
    }
  }

  req.user = user;

  next();
};

module.exports = authMiddleware;
