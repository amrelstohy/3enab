const express = require("express");
const router = express.Router();
const deliveryAreaController = require("../deliveryArea.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const DeliveryArea = require("../deliveryArea.model");

// User routes for delivery areas - View
router.get("", deliveryAreaController.getDeliveryAreas);

module.exports = router;
