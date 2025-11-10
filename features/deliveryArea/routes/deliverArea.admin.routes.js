const express = require("express");
const router = express.Router();
const deliveryAreaController = require("../deliveryArea.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const DeliveryArea = require("../deliveryArea.model");

// Admin routes for delivery areas - View and delete
router.post("", deliveryAreaController.createDeliveryArea);
router.get("", deliveryAreaController.getDeliveryAreas);
router.get(
  "/:deliveryAreaId",
  isResourceExists(DeliveryArea, "deliveryAreaId"),
  deliveryAreaController.getDeliveryAreaById
);
router.put(
  "/:deliveryAreaId",
  isResourceExists(DeliveryArea, "deliveryAreaId"),
  deliveryAreaController.updateDeliveryArea
);
router.delete(
  "/:deliveryAreaId",
  isResourceExists(DeliveryArea, "deliveryAreaId"),
  deliveryAreaController.deleteDeliveryArea
);

module.exports = router;
