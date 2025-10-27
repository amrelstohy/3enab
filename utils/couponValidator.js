const Coupon = require("../features/coupons/coupon.model");
const Order = require("../features/orders/order.model");
const {
  BadRequestError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
} = require("../utils/errors");

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

  if (!couponCode) throw new BadRequestError("Coupon code is required");
  if (!userId) throw new BadRequestError("User ID is required");
  if (!vendorId) throw new BadRequestError("Vendor ID is required");

  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) throw new NotFoundError("Coupon not found");

  // --- Global validity checks ---
  if (!coupon.isActive) throw new BadRequestError("Coupon is not active");
  if (coupon.startDate && now < coupon.startDate)
    throw new BadRequestError("Coupon not valid yet (start date not reached)");
  if (coupon.endDate && now > coupon.endDate)
    throw new BadRequestError("Coupon expired (end date passed)");
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses)
    throw new BadRequestError("Coupon max usage limit reached");

  // --- User-specific validity ---
  if (
    coupon.allowedUsers?.length &&
    !coupon.allowedUsers.some((u) => u.toString() === userId.toString())
  )
    throw new ForbiddenError("User not allowed to use this coupon");

  const usedCountByUser = await Order.countDocuments({
    appliedCoupon: coupon._id,
    user: userId,
  });

  if (coupon.maxUsesPerUser && usedCountByUser >= coupon.maxUsesPerUser)
    throw new ConflictError("User reached the usage limit for this coupon");

  // --- Vendor-specific validity ---
  if (
    coupon.vendors?.length &&
    !coupon.vendors.some((v) => v.toString() === vendorId.toString())
  )
    throw new ForbiddenError("This coupon is not valid for this vendor");

  return coupon;
}

module.exports = { validateCoupon };
