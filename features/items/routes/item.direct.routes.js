const express = require("express");
const router = express.Router();
const itemController = require("../item.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Item = require("../item.model");

// Direct routes - Direct access to item
router.get(
  "/:itemId",
  isResourceExists(Item, "itemId"),
  itemController.getItem
);

module.exports = router;
