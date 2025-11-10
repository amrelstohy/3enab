const express = require("express");
const router = express.Router({ mergeParams: true });
const addressController = require("./address.controller");

// Address routes for a user
router.post("", addressController.createAddress);
router.get("", addressController.getAddresses);
router.get("/default", addressController.getDefaultAddress);
router.get("/:id", addressController.getAddressById);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);
router.patch("/:id", addressController.setDefaultAddress);

module.exports = router;
