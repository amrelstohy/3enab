const express = require("express");
const router = express.Router();
const vendorCategoryController = require("../vendorCategory.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const isResourceExists = require("../../../middlewares/isResourceExists");
const { uploadImage } = require("../../../middlewares/uploadImage");
const adminMiddleware = require("../../../middlewares/admin.middleware");
const VendorCategory = require("../vendorCategory.model");

// Admin routes - Full CRUD
router.post(
  "",
  authMiddleware,
  adminMiddleware,
  vendorCategoryController.createVendorCategory
);

router.put(
  "/:vendorCategoryId",
  authMiddleware,
  isResourceExists(VendorCategory, "vendorCategoryId"),
  adminMiddleware,
  vendorCategoryController.updateVendorCategory
);

router.post(
  "/:vendorCategoryId/image",
  authMiddleware,
  isResourceExists(VendorCategory, "vendorCategoryId"),
  adminMiddleware,
  uploadImage("vendorCategories", "vendorCategoryId"),
  vendorCategoryController.uploadImage
);

router.delete(
  "/:vendorCategoryId",
  authMiddleware,
  isResourceExists(VendorCategory, "vendorCategoryId"),
  adminMiddleware,
  vendorCategoryController.deleteVendorCategory
);

router.patch(
  "/:vendorCategoryId/update-order",
  authMiddleware,
  isResourceExists(VendorCategory, "vendorCategoryId"),
  adminMiddleware,
  vendorCategoryController.updateOrder
);

router.patch(
  "/:vendorCategoryId/active",
  authMiddleware,
  isResourceExists(VendorCategory, "vendorCategoryId"),
  adminMiddleware,
  vendorCategoryController.updateActive
);

router.get("", vendorCategoryController.getVendorCategories);

router.get(
  "/:vendorCategoryId",
  isResourceExists(VendorCategory, "vendorCategoryId"),
  vendorCategoryController.getVendorCategory
);

module.exports = router;
