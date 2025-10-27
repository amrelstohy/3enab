const express = require("express");
const router = express.Router({ mergeParams: true });
const menuCategoryController = require("../menuCategory.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const isResourceExists = require("../../../middlewares/isResourceExists");
const MenuCategory = require("../menuCategory.model");
const Vendor = require("../../vendors/vendor.model");
const itemVendorRoutes = require("../../items/routes/item.vendor.routes");

// Vendor routes - Full CRUD
router.post(
  "",
  authMiddleware,
  checkOwnerShip(Vendor),
  menuCategoryController.createMenuCategory
);

router.put(
  "/:menuCategoryId",
  authMiddleware,
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateMenuCategory
);

router.delete(
  "/:menuCategoryId",
  authMiddleware,
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.deleteMenuCategory
);

router.patch(
  "/:menuCategoryId/active",
  authMiddleware,
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateActive
);

router.patch(
  "/:menuCategoryId/update-order",
  authMiddleware,
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateMenuCategoryOrder
);

// Item routes for vendors
router.use(
  "/:menuCategoryId/items",
  isResourceExists(MenuCategory, "menuCategoryId"),
  itemVendorRoutes
);

module.exports = router;
