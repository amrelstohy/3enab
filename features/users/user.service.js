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

// Change delivery status (online/offline/busy)
const changeDeliveryStatus = async (user, status) => {
  user.deliveryStatus = status;
  await user.save();
  return sanitizeUser(user);
};

// Get all delivery coordinators
const getDeliveryCoordinators = async () => {
  const coordinators = await User.find({
    type: "delivery",
    isDeliveryCoordinator: true,
  }).select("-password -refreshToken -phoneVerificationOTP -resetPasswordOTP");
  
  return coordinators;
};

// Get all delivery users
const getDeliveries = async () => {
  const deliveries = await User.find({
    type: "delivery",
  }).select("-password -refreshToken -phoneVerificationOTP -resetPasswordOTP");
  
  return deliveries;
};

// Update delivery user
const updateDelivery = async (deliveryId, updateData) => {
  const delivery = await User.findById(deliveryId);
  
  if (!delivery || delivery.type !== "delivery") {
    throw new ConflictError("Delivery user not found");
  }

  const { name, phone, email, isDeliveryCoordinator, deliveryStatus } = updateData;

  if (name) delivery.name = name;
  if (phone) delivery.phone = phone;
  if (email !== undefined) delivery.email = email;
  if (isDeliveryCoordinator !== undefined) delivery.isDeliveryCoordinator = isDeliveryCoordinator;
  if (deliveryStatus) delivery.deliveryStatus = deliveryStatus;

  await delivery.save();
  
  return sanitizeUser(delivery);
};

// Delete delivery user
const deleteDelivery = async (deliveryId) => {
  const delivery = await User.findById(deliveryId);
  
  if (!delivery || delivery.type !== "delivery") {
    throw new ConflictError("Delivery user not found");
  }

  await delivery.deleteOne();
};

module.exports = {
  getMe,
  updateUser,
  deleteUser,
  changePassword,
  changeDeliveryStatus,
  getDeliveryCoordinators,
  getDeliveries,
  updateDelivery,
  deleteDelivery,
};
