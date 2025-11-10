const couponService = require("./coupon.service");

// Create coupon
const createCoupon = async (req, res) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(201).json({
    status: "success",
    message: "Coupon created successfully",
    data: { coupon },
  });
};

// Get all coupons
const getCoupons = async (req, res) => {
  // Check if it's a user request (apply filters for active coupons only)
  const filters = req.user?.type === "user" ? { user: req.user._id } : {};

  const coupons = await couponService.getCoupons(req.query, filters);
  res.status(200).json({
    status: "success",
    message: "Coupons fetched successfully",
    data: { coupons },
  });
};

// Get coupon by ID
const getCouponById = async (req, res) => {
  const coupon = await couponService.getCouponById(req.coupon);
  res.status(200).json({
    status: "success",
    message: "Coupon fetched successfully",
    data: { coupon },
  });
};

// Update coupon
const updateCoupon = async (req, res) => {
  const coupon = await couponService.updateCoupon(req.coupon, req.body);
  res.status(200).json({
    status: "success",
    message: "Coupon updated successfully",
    data: { coupon },
  });
};

// Delete coupon
const deleteCoupon = async (req, res) => {
  await couponService.deleteCoupon(req.coupon);
  res.status(200).json({
    status: "success",
    message: "Coupon deleted successfully",
  });
};

// Update coupon active status
const updateActive = async (req, res) => {
  const coupon = await couponService.updateActive(
    req.coupon,
    req.body.isActive
  );
  res.status(200).json({
    status: "success",
    message: "Coupon active status updated successfully",
    data: { coupon },
  });
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  updateActive,
};
