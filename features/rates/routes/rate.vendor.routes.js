const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("../rate.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Rate = require("../rate.model");

// Vendor routes for rates - View only
router.get("", rateController.getRates);
router.get(
  "/:rateId",
  isResourceExists(Rate, "rateId"),
  rateController.getRateById
);

module.exports = router;
