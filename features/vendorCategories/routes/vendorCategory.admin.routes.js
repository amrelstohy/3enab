const express = require("express");
const router = express.Router();
const vendorCategoryController = require("../vendorCategory.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const { uploadImage } = require("../../../middlewares/uploadImage");
const VendorCategory = require("../vendorCategory.model");

// Admin routes - Full CRUD
router.post("", vendorCategoryController.createVendorCategory);

router.put(
  "/:vendorCategoryId",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.updateVendorCategory
);

router.post(
  "/:vendorCategoryId/image",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  uploadImage("vendorCategories", "vendorCategoryId"),
  vendorCategoryController.uploadImage
);

router.delete(
  "/:vendorCategoryId",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.deleteVendorCategory
);

router.patch(
  "/:vendorCategoryId/update-order",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.updateOrder
);

router.patch(
  "/:vendorCategoryId/active",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.updateActive
);

router.get("", vendorCategoryController.getVendorCategories);

router.get(
  "/:vendorCategoryId",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.getVendorCategory
);

module.exports = router;
