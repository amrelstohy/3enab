const express = require('express');
const router = express.Router({ mergeParams: true });
const itemController = require('../item.controller');
const isResourceExists = require('../../../middlewares/isResourceExists');
const Item = require('../item.model');
const Vendor = require('../../vendors/vendor.model');
const checkOwnerShip = require('../../../middlewares/checkOwnerShip');
const { uploadImage } = require('../../../middlewares/uploadImage');

// Create item
router.post('', checkOwnerShip(Vendor), itemController.createItem);

// get items
router.get('', checkOwnerShip(Vendor), itemController.getItems);

// get item by id
router.get(
  '/:itemId',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.getItem
);
// Upload item image
router.post(
  '/:itemId/image',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  uploadImage('items', 'itemId'),
  itemController.uploadItemImage
);

// Update item
router.put(
  '/:itemId',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.updateItem
);

// Delete item
router.delete(
  '/:itemId',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.deleteItem
);

// Update order
router.patch('/order', checkOwnerShip(Vendor), itemController.updateOrder);

// Apply discount to all vendor items
router.patch(
  '/discount',
  checkOwnerShip(Vendor),
  itemController.applyDiscountToAll
);

// Remove discount from all vendor items
router.delete(
  '/discount',
  checkOwnerShip(Vendor),
  itemController.removeDiscountFromAll
);

// Update item availability
router.patch(
  '/:itemId/availability',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.updateAvailability
);

// Update item active
router.patch(
  '/:itemId/active',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.updateActive
);

// Update item discount
router.patch(
  '/:itemId/discount',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.updateDiscount
);

// Remove item discount
router.delete(
  '/:itemId/discount',
  isResourceExists(Item, 'itemId'),
  checkOwnerShip(Vendor),
  itemController.removeDiscount
);

module.exports = router;
