const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("../rate.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Rate = require("../rate.model");

// Admin routes for rates - View and delete
router.get("", rateController.getRates);
router.get(
  "/:rateId",
  isResourceExists(Rate, "rateId"),
  rateController.getRateById
);
router.delete(
  "/:rateId",
  isResourceExists(Rate, "rateId"),
  rateController.deleteRate
);

module.exports = router;
