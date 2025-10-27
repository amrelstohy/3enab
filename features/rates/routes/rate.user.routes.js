const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("../rate.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const checkOwnerShip = require("../../../middlewares/checkOwnerShip");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Rate = require("../rate.model");

// User routes for rates
router.post("", authMiddleware, rateController.createRate);
router.get("", rateController.getRates);
router.get(
  "/:rateId",
  isResourceExists(Rate, "rateId"),
  rateController.getRateById
);
router.put(
  "/:rateId",
  authMiddleware,
  isResourceExists(Rate, "rateId"),
  checkOwnerShip(Rate, "user"),
  rateController.updateRate
);
router.delete(
  "/:rateId",
  authMiddleware,
  isResourceExists(Rate, "rateId"),
  checkOwnerShip(Rate, "user"),
  rateController.deleteRate
);

module.exports = router;
