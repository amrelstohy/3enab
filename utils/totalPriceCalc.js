const Item = require("../features/items/item.model");
const Vendor = require("../features/vendors/vendor.model");
const { NotFoundError, BadRequestError } = require("./errors");
const { validateCoupon } = require("./couponValidator");
const { applyCoupon } = require("./applyCoupon");
const DeliveryArea = require("../features/deliveryArea/deliveryArea.model");

/**
 * Check if vendor is currently open based on working hours (Egypt timezone)
 * @param {Object} vendor - Vendor document
 * @returns {Object} { isOpen: Boolean, message: String }
 */
const checkVendorIsOpen = (vendor) => {
  if (!vendor.workingHours) {
    return { isOpen: true, message: null };
  }

  const { open, close, days } = vendor.workingHours;

  // Get current time in Egypt timezone
  const egyptTime = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Cairo",
  });
  const now = new Date(egyptTime);

  // Get current day name
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = dayNames[now.getDay()];

  // Check if current day is a working day
  if (days && days.length > 0 && !days.includes(currentDay)) {
    return {
      isOpen: false,
      message: `المتجر مغلق اليوم (${currentDay})`,
    };
  }

  // Parse open and close times
  const [openHour, openMinute] = open.split(":").map(Number);
  const [closeHour, closeMinute] = close.split(":").map(Number);

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Convert to minutes for easier comparison
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  // Handle overnight hours (e.g., open: 22:00, close: 02:00)
  if (closeTimeInMinutes < openTimeInMinutes) {
    // Overnight case
    if (
      currentTimeInMinutes >= openTimeInMinutes ||
      currentTimeInMinutes < closeTimeInMinutes
    ) {
      return { isOpen: true, message: null };
    }
  } else {
    // Normal case
    if (
      currentTimeInMinutes >= openTimeInMinutes &&
      currentTimeInMinutes < closeTimeInMinutes
    ) {
      return { isOpen: true, message: null };
    }
  }

  return {
    isOpen: false,
    message: `المتجر مغلق الآن. ساعات العمل: ${open} - ${close}`,
  };
};

/**
 * Calculate total price of cart items
 * @param {Array} cartItems - Cart items
 * @param {String} userId - User ID
 * @param {String} deliveryAreaId - Delivery area ID
 * @param {String} couponCode - Coupon code
 * @throws NotFoundError, BadRequestError
 * @returns {Object} { subtotal: Number, coupon: String, discount: Number, deliveryFee: Number, total: Number, error: String|null }
 */
const totalPriceCalc = async (
  cartItems,
  userId,
  deliveryAreaId = null,
  couponCode = null,
  isPickup = false
) => {
  const result = {
    items: [],
    subtotal: 0,
    coupon: null,
    discount: 0,
    deliveryFee: 0,
    total: 0,
    vendor: null,
    user: userId,
    error: null,
  };

  // Create maps for easier lookup
  const cartItemsMap = new Map(
    cartItems.map((cartItem) => [
      cartItem.item,
      { quantity: cartItem.quantity, optionId: cartItem.optionId || null },
    ])
  );

  const itemIds = cartItems.map((cartItem) => cartItem.item);

  const items = await Item.find({
    _id: { $in: itemIds },
  });

  if (items.length !== cartItems.length) {
    throw new NotFoundError("Some items are not found");
  }

  const vendorIds = new Set(items.map((item) => item.vendor.toString()));

  if (vendorIds.size > 1) {
    throw new BadRequestError("Multiple vendors are not allowed");
  }

  const vendorId = vendorIds.values().next().value;
  result.vendor = vendorId;

  // Check if vendor is open
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    throw new NotFoundError("Vendor not found");
  }

  const vendorStatus = checkVendorIsOpen(vendor);
  if (!vendorStatus.isOpen) {
    throw new BadRequestError(vendorStatus.message);
  }

  let subtotal = 0;
  for (const item of items) {
    const cartItemData = cartItemsMap.get(item._id.toString());
    const optionId = cartItemData.optionId;

    // Get price using the item's getPrice method
    let unitPrice = item.getPrice(optionId);

    // If unitPrice is null, it means invalid optionId
    if (unitPrice === null) {
      throw new BadRequestError(
        `Invalid option selected for item: ${item.name}`
      );
    }

    let totalPrice = unitPrice * cartItemData.quantity;
    subtotal += totalPrice;

    // Get option value if optionId exists
    let optionValue = null;
    if (optionId && item.options.length > 0) {
      const selectedOption = item.options.id(optionId);
      if (selectedOption) {
        optionValue = selectedOption.value;
      }
    }

    result.items.push({
      item: item._id,
      optionId: optionId,
      optionValue: optionValue,
      quantity: cartItemData.quantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
    });
  }

  result.subtotal = subtotal;

  // Calculate delivery fee
  if (isPickup) {
    result.deliveryFee = 0;
  } else {
    const deliveryArea = await DeliveryArea.findById(deliveryAreaId);
    if (!deliveryArea) {
      throw new NotFoundError("Delivery area not found");
    }
    result.deliveryFee = deliveryArea.deliveryFee;
  }

  // Validate coupon if provided
  if (couponCode) {
    const couponResult = await validateCoupon(couponCode, userId, vendorId);
    if (!couponResult.isValid) {
      result.error = couponResult.error;
      result.discount = 0;
      result.total = subtotal + result.deliveryFee;
      return result;
    }

    // Apply coupon (includes minOrderValue validation)
    const couponApplied = applyCoupon(subtotal, couponResult.coupon);

    result.coupon = couponResult.coupon.code;
    result.discount = couponApplied.finalDiscount;
    result.total = couponApplied.total + result.deliveryFee;

    if (couponApplied.error) {
      result.error = couponApplied.error;
      return result;
    }
  } else {
    result.total = subtotal + result.deliveryFee;
  }

  return result;
};

module.exports = totalPriceCalc;
