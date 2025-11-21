const express = require("express");
const router = express.Router();
const userController = require("../user.controller");

// Delivery routes - Profile management
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.delete("/me", userController.deleteMe);
router.post("/me/change-password", userController.changePassword);
router.patch("/me/change-status", userController.changeDeliveryStatus);

router.get("/coordinators", userController.getDeliveryCoordinators);
router.get("/deliveries", userController.getDeliveries);
router.put("/deliveries/:id", userController.updateDelivery);
router.delete("/deliveries/:id", userController.deleteDelivery);

module.exports = router;
