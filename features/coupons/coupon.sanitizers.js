/**
 * Coupon sanitizers for cleaning returned data
 */

/**
 * Sanitize a single coupon
 * @param {Object} coupon - Coupon document from database
 * @returns {Object} Sanitized coupon object
 */
const sanitizeCoupon = (coupon) => {
  if (!coupon) return null;

  return {
    _id: coupon._id.toString(),
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
    minOrderValue: coupon.minOrderValue,
    maxDiscountValue: coupon.maxDiscountValue,
    description: coupon.description,
    startDate: coupon.startDate,
    endDate: coupon.endDate,
    isActive: coupon.isActive,
    maxUsesPerUser: coupon.maxUsesPerUser,
    maxUses: coupon.maxUses,
    usedCount: coupon.usedCount,
    allowedUser: coupon.allowedUser,
    vendors: coupon.vendors,
    createdAt: coupon.createdAt,
    updatedAt: coupon.updatedAt,
  };
};

/**
 * Sanitize multiple coupons
 * @param {Array} coupons - Array of coupon documents
 * @returns {Array} Array of sanitized coupon objects
 */
const sanitizeCoupons = (coupons) => {
  if (!Array.isArray(coupons)) return [];
  return coupons.map((coupon) => sanitizeCoupon(coupon));
};

module.exports = {
  sanitizeCoupon,
  sanitizeCoupons,
};
