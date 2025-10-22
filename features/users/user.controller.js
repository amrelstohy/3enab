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

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  changePassword,
};
