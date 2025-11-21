const userService = require("./user.service");

// Get current user profile
const getMe = async (req, res) => {
  const user = await userService.getMe(req.user);
  res.status(200).json({
    status: "success",
    message: "User profile fetched successfully",
    data: { user },
  });
};

// Update current user profile
const updateMe = async (req, res) => {
  const user = await userService.updateUser(req.user, req.body);
  res.status(200).json({
    status: "success",
    message: "User profile updated successfully",
    data: { user },
  });
};

// Delete current user account
const deleteMe = async (req, res) => {
  await userService.deleteUser(req.user);
  res.status(200).json({
    status: "success",
    message: "User account deleted successfully",
  });
};

// Change password
const changePassword = async (req, res) => {
  const user = await userService.changePassword(req.user, req.body);
  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
};

// Change delivery status
const changeDeliveryStatus = async (req, res) => {
  const { status } = req.body;
  const user = await userService.changeDeliveryStatus(req.user, status);
  res.status(200).json({
    status: "success",
    message: "Delivery status changed successfully",
    data: { user },
  });
};

// Get all delivery coordinators
const getDeliveryCoordinators = async (req, res) => {
  const coordinators = await userService.getDeliveryCoordinators();
  res.status(200).json({
    status: "success",
    message: "Delivery coordinators fetched successfully",
    data: { coordinators },
  });
};

// Get all delivery users
const getDeliveries = async (req, res) => {
  const deliveries = await userService.getDeliveries();
  res.status(200).json({
    status: "success",
    message: "Delivery users fetched successfully",
    data: { deliveries },
  });
};

// Update delivery user
const updateDelivery = async (req, res) => {
  const delivery = await userService.updateDelivery(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    message: "Delivery user updated successfully",
    data: { delivery },
  });
};

// Delete delivery user
const deleteDelivery = async (req, res) => {
  await userService.deleteDelivery(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Delivery user deleted successfully",
  });
};

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  changePassword,
  changeDeliveryStatus,
  getDeliveryCoordinators,
  getDeliveries,
  updateDelivery,
  deleteDelivery,
};
