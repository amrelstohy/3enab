const express = require("express");
const router = express.Router();
const adController = require("../ad.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Ad = require("../ad.model");
const optionalAuthMiddleware = require("../../../middlewares/optionalAuth.middleware");

// Public routes - User facing
router.get("", optionalAuthMiddleware, adController.getAds);
router.get("/:adId", optionalAuthMiddleware, isResourceExists(Ad, "adId"), adController.getAd);

module.exports = router;
