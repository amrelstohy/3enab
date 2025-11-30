const { Order, orderStatus } = require('./order.model');
const Address = require('../addresses/address.model');
const Vendor = require('../vendors/vendor.model');
const Coupon = require('../coupons/coupon.model');
const totalPriceCalc = require('../../utils/totalPriceCalc');
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require('../../utils/errors');
const { sanitizeOrder, sanitizeOrders } = require('./order.sanitizers');
const {
  notifyNewOrder,
  notifyOrderStatusUpdate,
  notifyOrderAccepted,
  notifyOrderCancelled,
  notifyDriverAssigned,
  notifyOrderDelivered,
  notifyPreparingOrder,
} = require('../../utils/socketService');

// Helper to get ID string from populated object or ObjectId
const getIdString = (obj) => {
  if (!obj) return null;
  if (obj._id) return obj._id.toString();
  return obj.toString();
};

// Preview order pricing without persisting
const previewOrder = async (
  user,
  { cartItems, addressId, couponCode, isPickup = false }
) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new BadRequestError('Cart items are required');
  }

  let deliveryAreaId = null;

  if (!isPickup) {
    if (!addressId) {
      throw new BadRequestError('Address is required for delivery orders');
    }
    const address = await Address.findById(addressId).lean();
    if (!address) throw new NotFoundError('Address not found');
    if (address.user.toString() !== user._id.toString()) {
      throw new UnauthorizedError('You are not allowed to use this address');
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
    paymentMethod = 'cash',
    notes = '',
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
    status: 'pending',
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
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);
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
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .sort({ createdAt: -1 })
    .lean();
  return sanitizeOrders(orders);
};

// Get single order (order provided by middleware)
const getOrder = async (order) => {
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);
  return sanitizeOrder(order);
};

// Get order by ID (for delivery users)
const getOrderById = async (orderId, user) => {
  const order = await Order.findById(orderId)
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .lean();

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  // Delivery users can see orders that are ready for delivery
  if (user.type === 'delivery') {
    return sanitizeOrder(order);
  }

  throw new UnauthorizedError('You are not allowed to view this order');
};

// Cancel order (instead of physical delete)
const cancelOrder = async (order, io = null) => {
  if (order.status !== 'pending') {
    throw new BadRequestError('Only pending orders can be cancelled');
  }
  order.status = 'cancelled';
  await order.save();
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);
  const sanitizedOrder = sanitizeOrder(order);

  // Notify vendor about cancellation
  if (io) {
    notifyOrderCancelled(io, getIdString(order.vendor), sanitizedOrder);
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
      throw new NotFoundError('Vendor not found');
    }
    if (vendor.owner.toString() !== user._id.toString()) {
      throw new UnauthorizedError(
        "You are not allowed to access this vendor's orders"
      );
    }
    filter.vendor = vendorId;
  } else {
    // Get all vendors owned by this user
    const vendors = await Vendor.find({ owner: user._id }).select('_id').lean();
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
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .sort({ createdAt: -1 })
    .lean();
  return sanitizeOrders(orders);
};

// Get single order for vendor (order provided by middleware)
const getVendorOrder = async (order) => {
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);
  return sanitizeOrder(order);
};

// Update order status (vendor can update status)
const updateOrderStatus = async (
  user,
  order,
  status,
  rejectionReason = null,
  io = null
) => {
  // Verify that the order belongs to a vendor owned by this user
  const vendor = await Vendor.findOne({
    _id: order.vendor,
    owner: user._id,
  }).lean();

  if (!vendor) {
    throw new UnauthorizedError('You are not allowed to update this order');
  }

  if (!orderStatus.includes(status)) {
    throw new BadRequestError('Invalid status');
  }

  // Prevent status changes to certain statuses if already in a later stage
  if (order.status === 'delivered') {
    throw new BadRequestError('Cannot change status of delivered order');
  }

  if (order.status === 'received_by_customer') {
    throw new BadRequestError('Cannot change status of completed order');
  }

  if (order.status === 'cancelled' || order.status === 'canceled_by_vendor') {
    throw new BadRequestError('Cannot change status of cancelled order');
  }

  const previousStatus = order.status;
  order.status = status;

  // Save rejection reason if vendor is canceling
  if (status === 'canceled_by_vendor' && rejectionReason) {
    order.rejectionReason = rejectionReason;
  }

  await order.save();

  // Populate items for all orders (user, vendor, and delivery)
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);
  const sanitizedOrder = sanitizeOrder(order);

  // Notify user about status update
  if (io) {
    // For delivery orders, prepare a separate order with full populate
    let deliveryOrder = null;
    if (!order.isPickup) {
      const fullOrder = await Order.findById(order._id)
        .populate({
          path: 'user',
          select: 'name phone',
        })
        .populate({
          path: 'vendor',
          select: 'name logoPath',
        })
        .populate({
          path: 'address',
        })
        .populate({
          path: 'items.item',
          select: 'name imagePath category',
          populate: {
            path: 'category',
            select: 'name',
          },
        })
        .lean();
      deliveryOrder = sanitizeOrder(fullOrder);
    }

    // If order is delivered, send delivery notification
    if (status === 'delivered') {
      notifyOrderDelivered(
        io,
        getIdString(order.user),
        getIdString(order.vendor),
        sanitizedOrder
      );
    } else if (status === 'preparing' && previousStatus === 'pending') {
      // Vendor accepted the order and started preparing
      notifyOrderAccepted(
        io,
        getIdString(order.user),
        sanitizedOrder,
        deliveryOrder
      );
    } else if (status === 'preparing') {
      // Order is already preparing, just update status
      notifyOrderStatusUpdate(
        io,
        getIdString(order.user),
        sanitizedOrder,
        deliveryOrder
      );
      // Notify delivery drivers that order is being prepared
      notifyPreparingOrder(io, deliveryOrder || sanitizedOrder);
    } else {
      // Notify user, vendor, and delivery (with appropriate data for each)
      notifyOrderStatusUpdate(
        io,
        getIdString(order.user),
        sanitizedOrder,
        deliveryOrder
      );
    }

    // If vendor cancels order
    if (status === 'canceled_by_vendor') {
      notifyOrderCancelled(io, getIdString(order.vendor), sanitizedOrder);
    }
  }

  return sanitizedOrder;
};

// Get all orders ready for delivery (status: preparing, out_for_delivery, or delivered)
const getDeliveryOrders = async (statuses = []) => {
  const filter = {
    isPickup: false, // Exclude pickup orders - they don't need delivery
  };

  // Only allow specific statuses for delivery
  const allowedStatuses = ['preparing', 'out_for_delivery', 'delivered'];

  // If no statuses provided, use all allowed statuses
  if (statuses.length === 0) {
    filter.status = { $in: allowedStatuses };
  } else {
    // Filter to only include allowed statuses
    const validStatuses = statuses.filter((status) =>
      allowedStatuses.includes(status)
    );

    // If no valid statuses after filtering, use all allowed statuses
    if (validStatuses.length === 0) {
      filter.status = { $in: allowedStatuses };
    } else {
      filter.status = { $in: validStatuses };
    }
  }

  const orders = await Order.find(filter)
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .sort({ createdAt: -1 })
    .lean();

  return sanitizeOrders(orders);
};

// Assign delivery driver to order
const assignDeliveryDriver = async (order, driverId, io = null) => {
  if (order.isPickup) {
    throw new BadRequestError(
      'Pickup orders do not require delivery assignment'
    );
  }

  if (order.status !== 'preparing' && order.status !== 'out_for_delivery') {
    throw new BadRequestError('Order is not ready for delivery assignment');
  }

  order.assignedDriver = driverId;
  order.status = 'out_for_delivery';
  await order.save();

  // Populate for delivery (full data)
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);

  const deliveryOrder = sanitizeOrder(order);

  // Get order with items only for user/vendor
  const userVendorOrder = await Order.findById(order._id)
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .lean();
  const userVendorSanitized = sanitizeOrder(userVendorOrder);

  // Notify user, vendor, and driver
  if (io) {
    notifyOrderStatusUpdate(
      io,
      getIdString(order.user),
      userVendorSanitized,
      deliveryOrder
    );
    notifyDriverAssigned(io, driverId.toString(), deliveryOrder);
  }

  return deliveryOrder;
};

// Update order status by delivery driver
const updateDeliveryOrderStatus = async (
  order,
  driverId,
  status,
  io = null
) => {
  if (order.isPickup) {
    throw new BadRequestError('Pickup orders cannot be updated by delivery');
  }

  // Delivery can only update to out_for_delivery or delivered
  if (status !== 'out_for_delivery' && status !== 'delivered') {
    throw new BadRequestError(
      "Delivery can only update status to 'out_for_delivery' or 'delivered'"
    );
  }

  // Prevent status changes if already delivered or cancelled
  if (order.status === 'delivered') {
    throw new BadRequestError('Order is already delivered');
  }

  if (order.status === 'completed' || order.status === 'received_by_customer') {
    throw new BadRequestError('Cannot update completed order');
  }

  if (order.status === 'cancelled' || order.status === 'canceled_by_vendor') {
    throw new BadRequestError('Cannot update cancelled order');
  }

  order.status = status;
  await order.save();

  // Populate for delivery (full data)
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);

  const deliveryOrder = sanitizeOrder(order);

  // Get order with items only for user/vendor
  const userVendorOrder = await Order.findById(order._id)
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .lean();
  const userVendorSanitized = sanitizeOrder(userVendorOrder);

  // Notify user, vendor, and delivery
  if (io) {
    if (status === 'delivered') {
      // Special notification when order is delivered
      notifyOrderDelivered(
        io,
        getIdString(order.user),
        getIdString(order.vendor),
        userVendorSanitized
      );
    } else {
      // General status update notification
      notifyOrderStatusUpdate(
        io,
        getIdString(order.user),
        userVendorSanitized,
        deliveryOrder
      );
    }
  }

  return deliveryOrder;
};

// Get delivery driver's assigned orders
const getDriverOrders = async (driverId, statuses = []) => {
  const filter = { assignedDriver: driverId };

  if (statuses.length > 0) {
    filter.status = { $in: statuses };
  }

  const orders = await Order.find(filter)
    .populate({
      path: 'user',
      select: 'name phone',
    })
    .populate({
      path: 'vendor',
      select: 'name logoPath',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .sort({ createdAt: -1 })
    .lean();

  return sanitizeOrders(orders);
};

// Cancel order by vendor
const cancelOrderByVendor = async (
  user,
  order,
  rejectionReason = null,
  io = null
) => {
  // Verify that the order belongs to a vendor owned by this user
  const vendor = await Vendor.findOne({
    _id: order.vendor,
    owner: user._id,
  }).lean();

  if (!vendor) {
    throw new UnauthorizedError('You are not allowed to cancel this order');
  }

  // Vendor can only cancel pending orders
  if (order.status !== 'pending') {
    throw new BadRequestError('Only pending orders can be cancelled');
  }

  order.status = 'canceled_by_vendor';
  if (rejectionReason) {
    order.rejectionReason = rejectionReason;
  }
  await order.save();
  await order.populate([
    {
      path: 'user',
      select: 'name phone',
    },
    {
      path: 'vendor',
      select: 'name logoPath',
    },
    {
      path: 'address',
    },
    {
      path: 'items.item',
      select: 'name imagePath category',
      populate: {
        path: 'category',
        select: 'name',
      },
    },
  ]);
  const sanitizedOrder = sanitizeOrder(order);

  // Notify user about cancellation (vendor is cancelling)
  if (io) {
    notifyOrderCancelled(io, getIdString(order.vendor), sanitizedOrder);
  }

  return sanitizedOrder;
};

module.exports = {
  previewOrder,
  createOrder,
  getOrders,
  getOrder,
  getOrderById,
  cancelOrder,
  getVendorOrders,
  getVendorOrder,
  updateOrderStatus,
  cancelOrderByVendor,
  getDeliveryOrders,
  assignDeliveryDriver,
  updateDeliveryOrderStatus,
  getDriverOrders,
};
