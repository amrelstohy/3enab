const express = require("express");
const router = express.Router();
const vendorController = require("../vendor.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const { uploadImage } = require("../../../middlewares/uploadImage");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Vendor = require("../vendor.model");
const menuCategoryVendorRoutes = require("../../menuCategories/routes/menuCategory.vendor.routes");
const rateVendorRoutes = require("../../rates/routes/rate.vendor.routes");

// Vendor routes - CRUD operations
router.post("", authMiddleware, vendorController.createVendor);

router.post(
  "/:vendorId/logo",
  authMiddleware,
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  uploadImage("vendorsLogos", "vendorId"),
  vendorController.uploadLogo
);

router.put(
  "/:vendorId",
  authMiddleware,
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.updateVendor
);

router.delete(
  "/:vendorId",
  authMiddleware,
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.deleteVendor
);

router.patch(
  "/:vendorId/active",
  authMiddleware,
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
