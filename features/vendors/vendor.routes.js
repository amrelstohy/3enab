const express = require("express");
const router = express.Router();
const vendorController = require("./vendor.controller");

// Import documentation
require("./vendor.docs");
const authMiddleware = require("../../middlewares/auth.middleware");
const { uploadImage } = require("../../middlewares/uploadImage");
const checkOwnerShip = require("../../middlewares/checkOwnerShip");
const isResourceExists = require("../../middlewares/isResourceExists");
const Vendor = require("./vendor.model");
const rateRoutes = require("../rates/rate.routes");
const menuCategoryRoutes = require("../menuCategories/menuCategory.routes");

router.post("", authMiddleware, vendorController.createVendor);
router.post(
  "/:vendorId/logo",
  authMiddleware,
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  uploadImage("vendorsLogos", "vendorId"),
  vendorController.uploadLogo
);
router.get("/:vendorId/logo", vendorController.getLogo);
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
router.get("/", vendorController.getVendors);
router.get("/:vendorId", vendorController.getVendorById);
router.patch(
  "/:vendorId/activate",
  authMiddleware,
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.updateActive
);
router.patch(
  "/:vendorId/deactivate",
  authMiddleware,
  isResourceExists(Vendor, "vendorId"),
  checkOwnerShip(Vendor),
  vendorController.updateInactive
);

router.use("/:vendorId/rates", rateRoutes);
router.use(
  "/:vendorId/categories",
  isResourceExists(Vendor, "vendorId"),
  menuCategoryRoutes
);
module.exports = router;
