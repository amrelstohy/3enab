const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../../../middlewares/auth.middleware");
const itemController = require("../item.controller");
const adminMiddleware = require("../../../middlewares/admin.middleware");

// Admin only routes
router.get(
  "",
  authMiddleware,
  adminMiddleware,
  itemController.getAllItemsForAdmin
);

module.exports = router;
