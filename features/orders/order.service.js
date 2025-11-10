const Order = require("./order.model");
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
const previewOrder = async (user, { cartItems, addressId, couponCode }) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new BadRequestError("Cart items are required");
  }

  const address = await Address.findById(addressId).lean();
  if (!address) throw new NotFoundError("Address not found");
  if (address.user.toString() !== user._id.toString()) {
    throw new UnauthorizedError("You are not allowed to use this address");
  }

  const pricing = await totalPriceCalc(
    cartItems,
    user._id.toString(),
    address.deliveryArea.toString(),
    couponCode || null
  );

  return pricing; // { items, subtotal, discount, deliveryFee, total, vendor, coupon }
};

// Create order using preview computation
const createOrder = async (
  user,
  { cartItems, addressId, couponCode, paymentMethod = "cash", notes = "" },
  io = null
) => {
  const pricing = await previewOrder(user, {
    cartItems,
    addressId,
    couponCode,
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
  const sanitizedOrder = sanitizeOrder(order);

  // Notify vendor about new order
  if (io) {
    notifyNewOrder(io, pricing.vendor.toString(), sanitizedOrder);
  }

  return sanitizedOrder;
};

// Get orders for a user
const getOrders = async (user, status = "") => {
  const filter = { user: user._id };
  if (status && status.trim() !== "") {
    filter.status = status;
  }
  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
  return sanitizeOrders(orders);
};

// Get single order (order provided by middleware)
const getOrder = async (order) => {
  return sanitizeOrder(order);
};

// Update order (allow user to update notes or cancel when allowed)
const updateOrder = async (user, order, updateData, io = null) => {
  if (order.user.toString() !== user._id.toString()) {
    throw new UnauthorizedError("You are not allowed to update this order");
  }

  const { notes, status } = updateData;

  if (notes !== undefined) order.notes = notes;

  if (status) {
    // user can only request cancel, and only when current status is pending
    if (status !== "cancelled") {
      throw new BadRequestError("Invalid status update by user");
    }
    if (order.status !== "pending") {
      throw new BadRequestError("Only pending orders can be cancelled");
    }
    order.status = "cancelled";
  }

  await order.save();
  const sanitizedOrder = sanitizeOrder(order);

  // Notify vendor if order was cancelled
  if (status === "cancelled" && io) {
    notifyOrderCancelled(io, order.vendor.toString(), sanitizedOrder);
  }

  return sanitizedOrder;
};

// Cancel order (instead of physical delete)
const cancelOrder = async (order, io = null) => {
  if (order.status !== "pending") {
    throw new BadRequestError("Only pending orders can be cancelled");
  }
  order.status = "cancelled";
  await order.save();
  const sanitizedOrder = sanitizeOrder(order);

  // Notify vendor about cancellation
  if (io) {
    notifyOrderCancelled(io, order.vendor.toString(), sanitizedOrder);
  }

  return sanitizedOrder;
};

// Get orders for a vendor or all vendors owned by user
const getVendorOrders = async (user, status = null, vendorId = null) => {
  const filter = {};
  if (vendorId) {
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
  }
  if (status) filter.status = status;
  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
  return sanitizeOrders(orders);
};

// Get single order for vendor (order provided by middleware)
const getVendorOrder = async (order) => {
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

  const validStatuses = [
    "pending",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
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
  updateOrder,
  cancelOrder,
  getVendorOrders,
  getVendorOrder,
  updateOrderStatus,
};
