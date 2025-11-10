/**
 * Apply coupon discount to subtotal
 * @param {Number} subtotal - Order subtotal
 * @param {Object} coupon - Coupon document
 * @returns {Object} { finalDiscount: Number, total: Number, error: String|null }
 */
const applyCoupon = (subtotal, coupon) => {
  // Check minimum order value
  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return {
      finalDiscount: 0,
      total: subtotal,
      error: `Minimum order value of ${coupon.minOrderValue} is required`,
    };
  }

  // Calculate base discount
  let discount =
    coupon.type === "percentage"
      ? subtotal * (coupon.value / 100)
      : coupon.value;

  // Apply maximum discount limit if exists
  let finalDiscount = discount;
  if (coupon.maxDiscountValue && discount > coupon.maxDiscountValue) {
    finalDiscount = coupon.maxDiscountValue;
  }

  // Ensure discount doesn't exceed subtotal
  if (finalDiscount > subtotal) {
    finalDiscount = subtotal;
  }

  const total = subtotal - finalDiscount;

  return {
    finalDiscount: finalDiscount,
    total: total,
    error: null,
  };
};

module.exports = { applyCoupon };
