const express = require("express");
const router = express.Router({ mergeParams: true });
const menuCategoryController = require("../menuCategory.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const MenuCategory = require("../menuCategory.model");
const itemUserRoutes = require("../../items/routes/item.user.routes");

// Public routes - User facing
router.get("", menuCategoryController.getMenuCategories);
router.get(
  "/:menuCategoryId",
  isResourceExists(MenuCategory, "menuCategoryId"),
  menuCategoryController.getMenuCategory
);

// Item routes for users
router.use(
  "/:menuCategoryId/items",
  isResourceExists(MenuCategory, "menuCategoryId"),
  itemUserRoutes
);

module.exports = router;
