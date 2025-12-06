const express = require("express");
const router = express.Router({ mergeParams: true });
const itemController = require("../item.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Item = require("../item.model");
const optionalAuthMiddleware = require("../../../middlewares/optionalAuth.middleware");

// Public routes - User facing
router.get("", optionalAuthMiddleware, itemController.getItems);
router.get(
  "/:itemId",
  optionalAuthMiddleware,
  isResourceExists(Item, "itemId"),
  itemController.getItem
);

module.exports = router;
