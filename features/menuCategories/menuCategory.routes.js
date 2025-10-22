const express = require("express");
const router = express.Router({ mergeParams: true });
const menuCategoryController = require("./menuCategory.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const checkOwnerShip = require("../../middlewares/checkOwnerShip");
const isResourceExists = require("../../middlewares/isResourceExists");
const MenuCategory = require("./menuCategory.model");
const Vendor = require("../vendors/vendor.model");
const itemRoutes = require("../items/item.routes");

// Import documentation
require("./menuCategory.docs");

router.post(
  "",
  authMiddleware,
  checkOwnerShip(Vendor),
  menuCategoryController.createCategory
);
router.put(
  "/:categoryId",
  authMiddleware,
  isResourceExists(MenuCategory, "categoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateCategory
);
router.delete(
  "/:categoryId",
  authMiddleware,
  isResourceExists(MenuCategory, "categoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.deleteCategory
);
router.get("", menuCategoryController.getCategories);
router.get(
  "/:categoryId",
  isResourceExists(MenuCategory, "categoryId"),
  menuCategoryController.getCategory
);
router.patch(
  "/:categoryId/activate",
  authMiddleware,
  isResourceExists(MenuCategory, "categoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.activateCategory
);
router.patch(
  "/:categoryId/deactivate",
  authMiddleware,
  isResourceExists(MenuCategory, "categoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.deactivateCategory
);
router.patch(
  "/:categoryId/update-order",
  authMiddleware,
  isResourceExists(MenuCategory, "categoryId"),
  checkOwnerShip(Vendor),
  menuCategoryController.updateOrder
);

router.use(
  "/:categoryId/items",
  isResourceExists(MenuCategory, "categoryId"),
  itemRoutes
);

module.exports = router;
