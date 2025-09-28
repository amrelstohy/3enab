/**
 * User sanitizers for cleaning returned data
 */

/**
 * Sanitize a single user - returns all data except unused frontend fields
 * @param {Object} user - User document from database
 * @returns {Object} Sanitized user object
 */
const sanitizeUser = (user) => {
  if (!user) return null;

  sanitizedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    phone: user.phone,
    isPhoneVerified: user.isPhoneVerified,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return sanitizedUser;
};

/**
 * Sanitize multiple users - returns all data except unused frontend fields
 * @param {Array} users - Array of user documents
 * @returns {Array} Array of sanitized user objects
 */
const sanitizeUsers = (users) => {
  if (!Array.isArray(users)) return [];
  return users.map((user) => sanitizeUser(user));
};

module.exports = {
  sanitizeUser,
  sanitizeUsers,
};
