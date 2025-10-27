const express = require("express");
const router = express.Router();
const vendorCategoryController = require("../vendorCategory.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const VendorCategory = require("../vendorCategory.model");

// Vendor routes - Read only
router.get("", vendorCategoryController.getVendorCategories);
router.get(
  "/:vendorCategoryId",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.getVendorCategory
);

module.exports = router;
