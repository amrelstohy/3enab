const express = require("express");
const router = express.Router();
const couponController = require("../coupon.controller");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Coupon = require("../coupon.model");

// Admin routes - already protected by checkApiKey("admin") + isAuth
router.post("", couponController.createCoupon);
router.get("", couponController.getCoupons);
router.get(
  "/:couponId",
  isResourceExists(Coupon, "couponId"),
  couponController.getCouponById
);
router.put(
  "/:couponId",
  isResourceExists(Coupon, "couponId"),
  couponController.updateCoupon
);
router.delete(
  "/:couponId",
  isResourceExists(Coupon, "couponId"),
  couponController.deleteCoupon
);
router.patch(
  "/:couponId/active",
  isResourceExists(Coupon, "couponId"),
  couponController.updateActive
);

module.exports = router;
