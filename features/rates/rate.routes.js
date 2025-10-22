const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("./rate.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const checkOwnerShip = require("../../middlewares/checkOwnerShip");
const Rate = require("./rate.model");

// Import documentation
require("./rate.docs");

// Routes
router.post("", authMiddleware, rateController.createRate);
router.get("", rateController.getRates);
router.get("/:rateId", rateController.getRateById);
router.put(
  "/:rateId",
  authMiddleware,
  checkOwnerShip(Rate),
  rateController.updateRate
);
router.delete(
  "/:rateId",
  authMiddleware,
  checkOwnerShip(Rate),
  rateController.deleteRate
);

module.exports = router;
