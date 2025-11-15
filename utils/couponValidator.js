const Coupon = require("../features/coupons/coupon.model");
const { Order } = require("../features/orders/order.model");

/**
 * Validate a coupon against user, vendor, and global constraints.
 * @param {String} couponCode - Coupon code
 * @param {String} userId - User ObjectId
 * @param {String} vendorId - Vendor ObjectId
 * @throws BadRequestError, ForbiddenError, ConflictError, NotFoundError
 * @returns {Object} coupon document (if valid)
 */
async function validateCoupon(couponCode, userId, vendorId) {
  const now = new Date();
  const result = {
    coupon: null,
    isValid: false,
    error: null,
  };

  if (!couponCode) {
    result.error = "Coupon code is required";
    return result;
  }
  if (!userId) {
    result.error = "User ID is required";
    return result;
  }
  if (!vendorId) {
    result.error = "Vendor ID is required";
    return result;
  }
  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    result.error = "Coupon not found";
    return result;
  }

  // --- Global validity checks ---
  if (!coupon.isActive) {
    result.error = "Coupon is not active";
    return result;
  }
  if (coupon.startDate && now < coupon.startDate) {
    result.error = "Coupon not valid yet (start date not reached)";
    return result;
  }
  if (coupon.endDate && now > coupon.endDate) {
    result.error = "Coupon expired (end date passed)";
    return result;
  }
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    result.error = "Coupon max usage limit reached";
    return result;
  }

  // --- User-specific validity ---
  if (
    coupon.allowedUser &&
    coupon.allowedUser.toString() !== userId.toString()
  ) {
    result.error = "User not allowed to use this coupon";
    return result;
  }

  const usedCountByUser = await Order.countDocuments({
    appliedCoupon: coupon._id,
    user: userId,
  });

  if (coupon.maxUsesPerUser && usedCountByUser >= coupon.maxUsesPerUser) {
    result.error = "User reached the usage limit for this coupon";
    return result;
  }

  // --- Vendor-specific validity ---
  if (
    coupon.vendors?.length &&
    !coupon.vendors.some((v) => v.toString() === vendorId.toString())
  ) {
    result.error = "This coupon is not valid for this vendor";
    return result;
  }

  result.coupon = coupon;
  result.isValid = true;
  return result;
}

module.exports = { validateCoupon };
