const express = require("express");
const router = express.Router();
const deliveryAreaController = require("../deliveryArea.controller");
const optionalAuthMiddleware = require("../../../middlewares/optionalAuth.middleware");

// User routes for delivery areas - View
router.get("", optionalAuthMiddleware, deliveryAreaController.getDeliveryAreas);

module.exports = router;
