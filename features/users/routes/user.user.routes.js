const express = require("express");
const router = express.Router();
const userController = require("../user.controller");
const addressRoutes = require("../../addresses/address.routes");
const authMiddleware = require("../../../middlewares/auth.middleware");

// User routes - Profile management
router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);
router.delete("/me", authMiddleware, userController.deleteMe);
router.post(
  "/me/change-password",
  authMiddleware,
  userController.changePassword
);

// Addresses
router.use("/addresses", addressRoutes);

module.exports = router;
