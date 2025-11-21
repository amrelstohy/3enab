const express = require("express");
const router = express.Router();
const orderController = require("../order.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const { Order } = require("../order.model");

// Get all available orders for delivery (preparing status)
router.get("/available", orderController.getDeliveryOrders);

// Get driver's assigned orders
router.get("/my-orders", orderController.getMyDeliveryOrders);

// Get specific order details
router.get("/:orderId", orderController.getOrderById);

// Assign driver to an order
router.post(
  "/:orderId/assign",
  isResourceExists(Order, "orderId"),
  orderController.assignDriver
);

// Update order status (to delivered)
router.patch(
  "/:orderId/status",
  isResourceExists(Order, "orderId"),
  orderController.updateDeliveryStatus
);

module.exports = router;
