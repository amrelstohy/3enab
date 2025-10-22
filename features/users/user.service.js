const User = require("./user.model");
const { ConflictError } = require("../../utils/errors");
const { sanitizeUser } = require("./user.sanitizers");
const bcrypt = require("bcryptjs");

// Get user by ID
const getMe = async (user) => {
  return sanitizeUser(user);
};

// Update user profile
const updateUser = async (user, updateData) => {
  const { name } = updateData;

  user.name = name;
  await user.save();

  return sanitizeUser(user);
};

// Delete user account
const deleteUser = async (user) => {
  await user.deleteOne();
};

// Change password
const changePassword = async (user, updateData) => {
  const { oldPassword, newPassword } = updateData;

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (isMatch) {
    throw new ConflictError("Old password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
};

module.exports = {
  getMe,
  updateUser,
  deleteUser,
  changePassword,
};
