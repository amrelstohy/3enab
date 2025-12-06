const express = require("express");
const router = express.Router();
const vendorCategoryController = require("../vendorCategory.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const VendorCategory = require("../vendorCategory.model");
const optionalAuthMiddleware = require("../../../middlewares/optionalAuth.middleware");

// Public routes - User facing
router.get("", optionalAuthMiddleware, vendorCategoryController.getVendorCategories);
router.get(
  "/:vendorCategoryId",
  optionalAuthMiddleware,
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.getVendorCategory
);

module.exports = router;
