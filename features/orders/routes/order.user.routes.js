const express = require("express");
const router = express.Router();
const orderController = require("../order.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Order = require("../order.model");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");

router.post("/preview", orderController.previewOrder);
router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get(
  "/:orderId",
  isResourceExists(Order, "orderId"),
  checkOwnerShip(Order, "user"),
  orderController.getOrder
);
// router.put("/:orderId", orderController.updateOrder);
router.delete(
  "/:orderId",
  isResourceExists(Order, "orderId"),
  checkOwnerShip(Order, "user"),
  orderController.deleteOrder
);

module.exports = router;
