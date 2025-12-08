const express = require("express");
const router = express.Router();
const orderController = require("../order.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const { Order } = require("../order.model");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const optionalAuthMiddleware = require("../../../middlewares/optionalAuth.middleware");

router.post("/preview", optionalAuthMiddleware, orderController.previewOrder);
router.post("/", optionalAuthMiddleware, orderController.createOrder);
router.get("/", optionalAuthMiddleware, orderController.getOrders);
router.get(
  "/:orderId",
  optionalAuthMiddleware,
  isResourceExists(Order, "orderId"),
  checkOwnerShip(Order, "user"),
  orderController.getOrder
);
router.delete(
  "/:orderId",
  optionalAuthMiddleware,
  isResourceExists(Order, "orderId"),
  checkOwnerShip(Order, "user"),
  orderController.deleteOrder
);

module.exports = router;
