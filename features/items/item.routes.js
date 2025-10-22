const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../../middlewares/auth.middleware");
const itemController = require("./item.controller");
const isResourceExists = require("../../middlewares/isResourceExists");
const Item = require("./item.model");
const Vendor = require("../vendors/vendor.model");
const checkOwnerShip = require("../../middlewares/checkOwnerShip");
const { uploadImage } = require("../../middlewares/uploadImage");

// Import documentation
require("./item.docs");

// Create item
router.post(
  "",
  authMiddleware,
  checkOwnerShip(Vendor),
  itemController.createItem
);

// Upload item image
router.post(
  "/:itemId/image",
  authMiddleware,
  isResourceExists(Item, "itemId"),
  checkOwnerShip(Vendor),
  uploadImage("items", "itemId"),
  itemController.uploadItemImage
);

// Get item image
router.get(
  "/:itemId/image",
  isResourceExists(Item, "itemId"),
  itemController.getItemImage
);

// Update item
router.put(
  "/:itemId",
  authMiddleware,
  isResourceExists(Item, "itemId"),
  checkOwnerShip(Vendor),
  itemController.updateItem
);

// Delete item
router.delete(
  "/:itemId",
  authMiddleware,
  isResourceExists(Item, "itemId"),
  checkOwnerShip(Vendor),
  itemController.deleteItem
);

// Get all items
router.get("", itemController.getItems);

// Get item by id
router.get(
  "/:itemId",
  isResourceExists(Item, "itemId"),
  itemController.getItem
);

// Update order
router.patch(
  "/order",
  authMiddleware,
  checkOwnerShip(Vendor),
  itemController.updateOrder
);

// Update item status
router.patch(
  "/:itemId/status",
  authMiddleware,
  isResourceExists(Item, "itemId"),
  checkOwnerShip(Vendor),
  itemController.updateStatus
);

// Update item discount
router.patch(
  "/:itemId/discount",
  authMiddleware,
  isResourceExists(Item, "itemId"),
  checkOwnerShip(Vendor),
  itemController.updateDiscount
);

// Remove item discount
router.delete(
  "/:itemId/discount",
  authMiddleware,
  isResourceExists(Item, "itemId"),
  checkOwnerShip(Vendor),
  itemController.removeDiscount
);

module.exports = router;
