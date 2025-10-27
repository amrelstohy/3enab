const express = require("express");
const router = express.Router({ mergeParams: true });
const rateController = require("../rate.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const adminMiddleware = require("../../../middlewares/admin.middleware");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Rate = require("../rate.model");

// Admin routes for rates - View and delete
router.get("", authMiddleware, adminMiddleware, rateController.getRates);
router.get(
  "/:rateId",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Rate, "rateId"),
  rateController.getRateById
);
router.delete(
  "/:rateId",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Rate, "rateId"),
  rateController.deleteRate
);

module.exports = router;
