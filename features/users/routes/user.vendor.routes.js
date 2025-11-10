const express = require("express");
const router = express.Router();
const userController = require("../user.controller");

// Vendor routes - Profile management
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);
router.post("/me/change-password", userController.changePassword);

module.exports = router;
