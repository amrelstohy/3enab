const express = require("express");
const router = express.Router({ mergeParams: true });
const addressController = require("./address.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

// Address routes for a user
router.post("", authMiddleware, addressController.createAddress);
router.get("", authMiddleware, addressController.getAddresses);
router.get("/default", authMiddleware, addressController.getDefaultAddress);
router.get("/:id", authMiddleware, addressController.getAddressById);
router.put("/:id", authMiddleware, addressController.updateAddress);
router.delete("/:id", authMiddleware, addressController.deleteAddress);
router.patch("/:id", authMiddleware, addressController.setDefaultAddress);

module.exports = router;
