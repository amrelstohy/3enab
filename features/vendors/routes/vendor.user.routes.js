const express = require("express");
const router = express.Router();
const vendorController = require("../vendor.controller");
const rateUserRoutes = require("../../rates/routes/rate.user.routes");
const menuCategoryUserRoutes = require("../../menuCategories/routes/menuCategory.user.routes");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Vendor = require("../vendor.model");

// Public routes - User facing
router.get("/", vendorController.getVendors);
router.get("/:vendorId", vendorController.getVendorById);
router.get("/:vendorId/logo", vendorController.getLogo);

// Rates - User routes
router.use("/:vendorId/rates", rateUserRoutes);

// Menu Categories - User routes
router.use(
  "/:vendorId/categories",
  isResourceExists(Vendor, "vendorId"),
  menuCategoryUserRoutes
);

module.exports = router;
