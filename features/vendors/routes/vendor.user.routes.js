const express = require("express");
const router = express.Router();
const vendorController = require("../vendor.controller");
const rateUserRoutes = require("../../rates/routes/rate.user.routes");
const menuCategoryUserRoutes = require("../../menuCategories/routes/menuCategory.user.routes");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Vendor = require("../vendor.model");
const optionalAuthMiddleware = require("../../../middlewares/optionalAuth.middleware");
// Public routes - User facing
router.get("/", optionalAuthMiddleware, vendorController.getVendors);
router.get("/:vendorId", optionalAuthMiddleware, vendorController.getVendorById);
router.get("/:vendorId/logo", optionalAuthMiddleware, vendorController.getLogo);

// Rates - User routes
router.use("/:vendorId/rates", optionalAuthMiddleware, rateUserRoutes);

// Menu Categories - User routes
router.use(
  "/:vendorId/categories",
  optionalAuthMiddleware,
  isResourceExists(Vendor, "vendorId"),
  menuCategoryUserRoutes
);

module.exports = router;
