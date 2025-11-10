const express = require("express");
const router = express.Router();
const vendorController = require("../vendor.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Vendor = require("../vendor.model");
const menuCategoryAdminRoutes = require("../../menuCategories/routes/menuCategory.admin.routes");
const rateAdminRoutes = require("../../rates/routes/rate.admin.routes");

// Admin only routes
router.get("", vendorController.getAllVendorsForAdmin);

// Rates - Admin routes
router.use(
  "/:vendorId/rates",
  isResourceExists(Vendor, "vendorId"),
  rateAdminRoutes
);

// Menu Categories - Admin routes
router.use(
  "/:vendorId/categories",
  isResourceExists(Vendor, "vendorId"),
  menuCategoryAdminRoutes
);

module.exports = router;
