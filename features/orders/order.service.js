const { Order, orderStatus } = require("./order.model");
const Address = require("../addresses/address.model");
const Vendor = require("../vendors/vendor.model");
const Coupon = require("../coupons/coupon.model");
const totalPriceCalc = require("../../utils/totalPriceCalc");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../../utils/errors");
const { sanitizeOrder, sanitizeOrders } = require("./order.sanitizers");
const {
  notifyNewOrder,
  notifyOrderStatusUpdate,
  notifyOrderAccepted,
  notifyOrderCancelled,
} = require("../../utils/socketService");

// Preview order pricing without persisting
const previewOrder = async (
  user,
  { cartItems, addressId, couponCode, isPickup = false }
) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new BadRequestError("Cart items are required");
  }

  let deliveryAreaId = null;

  if (!isPickup) {
    if (!addressId) {
      throw new BadRequestError("Address is required for delivery orders");
    }
    const address = await Address.findById(addressId).lean();
    if (!address) throw new NotFoundError("Address not found");
    if (address.user.toString() !== user._id.toString()) {
      throw new UnauthorizedError("You are not allowed to use this address");
    }
    deliveryAreaId = address?.deliveryArea?.toString() || null;
  }

  const pricing = await totalPriceCalc(
    cartItems,
    user._id.toString(),
    deliveryAreaId,
    couponCode || null,
    isPickup
  );

  return pricing; // { items, subtotal, discount, deliveryFee, total, vendor, coupon }
};

// Create order using preview computation
const createOrder = async (
  user,
  {
    cartItems,
    addressId,
    couponCode,
    paymentMethod = "cash",
    notes = "",
    isPickup = false,
  },
  io = null
) => {
  const pricing = await previewOrder(user, {
    cartItems,
    addressId,
    couponCode,
    isPickup,
  });

  const orderData = {
    user: user._id,
    vendor: pricing.vendor,
    items: pricing.items,
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    deliveryFee: pricing.deliveryFee,
    total: pricing.total,
    appliedCoupon: null,
    status: "pending",
    address: addressId,
    paymentMethod,
    isPickup,
    notes,
  };

  if (pricing.coupon) {
    const couponDoc = await Coupon.findOne({ code: pricing.coupon });
    if (couponDoc) {
      orderData.appliedCoupon = couponDoc._id;
      // increment usedCount (soft accounting)
      await Coupon.updateOne(
        { _id: couponDoc._id },
        { $inc: { usedCount: 1 } }
      );
    }
  }

  const order = await Order.create(orderData);
  order.populate("items.item", "name imagePath");
  const sanitizedOrder = sanitizeOrder(order);

  // Notify vendor about new order
  if (io) {
    notifyNewOrder(io, pricing.vendor.toString(), sanitizedOrder);
  }

  return sanitizedOrder;
};

// Get orders for a user
const getOrders = async (user, statuses = []) => {
  const filter = { user: user._id };
  if (statuses.length > 0) {
    filter.status = { $in: statuses };
  }
  const orders = await Order.find(filter)
    .populate("items.item", "name imagePath")
    .sort({ createdAt: -1 })
    .lean();
  return sanitizeOrders(orders);
};

// Get single order (order provided by middleware)
const getOrder = async (order) => {
  order.populate("items.item", "name imagePath");
  return sanitizeOrder(order);
};

// Cancel order (instead of physical delete)
const cancelOrder = async (order, io = null) => {
  if (order.status !== "pending") {
    throw new BadRequestError("Only pending orders can be cancelled");
  }
  order.status = "cancelled";
  await order.save();
  order.populate("items.item", "name imagePath");
  const sanitizedOrder = sanitizeOrder(order);

  // Notify vendor about cancellation
  if (io) {
    notifyOrderCancelled(io, order.vendor.toString(), sanitizedOrder);
  }

  return sanitizedOrder;
};

// Get orders for a vendor or all vendors owned by user
const getVendorOrders = async (user, statuses = [], vendorId = null) => {
  const filter = {};

  if (vendorId) {
    // Filter by specific vendor
    const vendor = await Vendor.findById(vendorId).lean();
    if (!vendor) {
      throw new NotFoundError("Vendor not found");
    }
    if (vendor.owner.toString() !== user._id.toString()) {
      throw new UnauthorizedError(
        "You are not allowed to access this vendor's orders"
      );
    }
    filter.vendor = vendorId;
  } else {
    // Get all vendors owned by this user
    const vendors = await Vendor.find({ owner: user._id }).select("_id").lean();
    const vendorIds = vendors.map((v) => v._id);

    if (vendorIds.length === 0) {
      return [];
    }

    filter.vendor = { $in: vendorIds };
  }

  if (statuses.length > 0) {
    filter.status = { $in: statuses };
  }

  const orders = await Order.find(filter)
    .populate("items.item", "name imagePath")
    .sort({ createdAt: -1 })
    .lean();
  return sanitizeOrders(orders);
};

// Get single order for vendor (order provided by middleware)
const getVendorOrder = async (order) => {
  order.populate("items.item", "name imagePath");
  return sanitizeOrder(order);
};

// Update order status (vendor can update status)
const updateOrderStatus = async (user, order, status, io = null) => {
  // Verify that the order belongs to a vendor owned by this user
  const vendor = await Vendor.findOne({
    _id: order.vendor,
    owner: user._id,
  }).lean();

  if (!vendor) {
    throw new UnauthorizedError("You are not allowed to update this order");
  }

  if (!orderStatus.includes(status)) {
    throw new BadRequestError("Invalid status");
  }

  // Prevent status changes to certain statuses if already in a later stage
  if (order.status === "delivered") {
    throw new BadRequestError("Cannot change status of delivered order");
  }

  if (order.status === "cancelled") {
    throw new BadRequestError("Cannot change status of cancelled order");
  }

  const previousStatus = order.status;
  order.status = status;
  await order.save();
  order.populate("items.item", "name imagePath");
  const sanitizedOrder = sanitizeOrder(order);

  // Notify user about status update
  if (io) {
    notifyOrderStatusUpdate(io, order.user.toString(), sanitizedOrder);

    // If vendor accepts order (changes from pending to preparing), notify delivery
    if (previousStatus === "pending" && status === "preparing") {
      notifyOrderAccepted(io, sanitizedOrder);
    }
  }

  return sanitizedOrder;
};

module.exports = {
  previewOrder,
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  getVendorOrders,
  getVendorOrder,
  updateOrderStatus,
};
