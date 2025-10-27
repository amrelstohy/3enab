const express = require("express");
const router = express.Router({ mergeParams: true });
const itemController = require("../item.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Item = require("../item.model");

// Public routes - User facing
router.get("", itemController.getItems);
router.get(
  "/:itemId",
  isResourceExists(Item, "itemId"),
  itemController.getItem
);

module.exports = router;
