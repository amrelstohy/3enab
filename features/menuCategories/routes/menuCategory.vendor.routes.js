const express = require("express");
const router = express.Router({ mergeParams: true });
const menuCategoryController = require("../menuCategory.controller");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const isResourceExists = require("../../../middlewares/isResourceExists");
const MenuCategory = require("../menuCategory.model");
const Vendor = require("../../vendors/vendor.model");
const itemVendorRoutes = require("../../items/routes/item.vendor.routes");

// Vendor routes - Full CRUD
router.post(
  "",
  checkOwnerShip(Vendor),
  menuCategoryController.createMenuCategory
);

// get menu categories
router.get(
  "",
  checkOwnerShip(Vendor),
  menuCategoryController.getMenuCategories
);

// get menu category by id
router.get(
  "/:menuCategoryId",
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.getMenuCategory
);

router.put(
  "/:menuCategoryId",
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateMenuCategory
);

router.delete(
  "/:menuCategoryId",
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.deleteMenuCategory
);

router.patch(
  "/:menuCategoryId/active",
  isResourceExists(MenuCategory, "menuCategoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateActive
);

router.patch(
  "/:menuCategoryId/update-order",
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
