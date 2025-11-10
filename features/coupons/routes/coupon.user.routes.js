const express = require("express");
const router = express.Router();
const couponController = require("../coupon.controller");

// User routes - view active coupons only.
router.get("", couponController.getCoupons);

module.exports = router;
