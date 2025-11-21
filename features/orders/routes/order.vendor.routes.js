const express = require("express");
const router = express.Router();
const orderController = require("../order.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const { Order } = require("../order.model");

router.get("/", orderController.getVendorOrders);
router.get(
  "/:orderId",
  isResourceExists(Order, "orderId"),
  checkOwnerShip(Order, "vendor"),
  orderController.getVendorOrder
);
router.patch(
  "/:orderId/status",
  isResourceExists(Order, "orderId"),
  orderController.updateOrderStatus
);
router.delete(
  "/:orderId",
  isResourceExists(Order, "orderId"),
  orderController.cancelOrderByVendor
);

module.exports = router;
