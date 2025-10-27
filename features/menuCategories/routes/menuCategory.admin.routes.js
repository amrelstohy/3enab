const express = require("express");
const router = express.Router({ mergeParams: true });
const menuCategoryController = require("../menuCategory.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const adminMiddleware = require("../../../middlewares/admin.middleware");
const isResourceExists = require("../../../middlewares/isResourceExists");
const MenuCategory = require("../menuCategory.model");
const itemAdminRoutes = require("../../items/routes/item.admin.routes");

// Admin only routes
router.get(
  "",
  authMiddleware,
  adminMiddleware,
  menuCategoryController.getAllMenuCategoriesForAdmin
);

// Item routes for admin
router.use(
  "/:menuCategoryId/items",
  isResourceExists(MenuCategory, "menuCategoryId"),
  itemAdminRoutes
);

module.exports = router;
