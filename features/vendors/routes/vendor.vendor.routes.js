const express = require("express");
const router = express.Router();
const vendorController = require("../vendor.controller");
const { uploadImage } = require("../../../middlewares/uploadImage");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Vendor = require("../vendor.model");
const menuCategoryVendorRoutes = require("../../menuCategories/routes/menuCategory.vendor.routes");
const rateVendorRoutes = require("../../rates/routes/rate.vendor.routes");

// Vendor routes - CRUD operations
router.post("", vendorController.createVendor);

router.get("", vendorController.getMyVendors);

router.post(
  "/:vendorId/logo",
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  uploadImage("vendorsLogos", "vendorId"),
  vendorController.uploadLogo
);

router.put(
  "/:vendorId",
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.updateVendor
);

router.delete(
  "/:vendorId",
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.deleteVendor
);

router.patch(
  "/:vendorId/active",
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.updateActive
);

// Rates - Vendor routes
router.use(
  "/:vendorId/rates",
  isResourceExists(Vendor, "vendorId"),
  rateVendorRoutes
);

// Menu Categories - Vendor routes
router.use(
  "/:vendorId/categories",
  isResourceExists(Vendor, "vendorId"),
  menuCategoryVendorRoutes
);

module.exports = router;
