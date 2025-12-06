const authMiddleware = require('./auth.middleware');

const optionalAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  // If no token, continue without user
  if (!token) {
    req.user = null;
    return next();
  }

  // If token exists, validate it (will throw error if invalid)
  await authMiddleware(req, res, next);
};

module.exports = optionalAuthMiddleware;
