const express = require("express");
const router = express.Router();
const adController = require("../ad.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Ad = require("../ad.model");

// Public routes - User facing
router.get("", adController.getAds);
router.get("/:adId", isResourceExists(Ad, "adId"), adController.getAd);

module.exports = router;
