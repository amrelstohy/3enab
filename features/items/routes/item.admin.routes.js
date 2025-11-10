const express = require("express");
const router = express.Router({ mergeParams: true });
const itemController = require("../item.controller");

// Admin only routes
router.get("", itemController.getAllItemsForAdmin);

module.exports = router;
