const express = require("express");
const router = express.Router();
const userController = require("../user.controller");
const addressRoutes = require("../../addresses/address.routes");

// User routes - Profile management
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);
router.post("/me/change-password", userController.changePassword);

// Addresses
router.use("/me/addresses", addressRoutes);

module.exports = router;
