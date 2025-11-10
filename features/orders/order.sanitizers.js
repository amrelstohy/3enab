const sanitizeOrderItem = (orderItem) => {
  return {
    item: orderItem.item,
    quantity: orderItem.quantity,
    unitPrice: orderItem.unitPrice,
    totalPrice: orderItem.totalPrice,
  };
};

const sanitizeOrder = (order) => {
  if (!order) return null;
  return {
    _id: order._id,
    user: order.user,
    vendor: order.vendor,
    items: Array.isArray(order.items) ? order.items.map(sanitizeOrderItem) : [],
    subtotal: order.subtotal,
    discount: order.discount,
    deliveryFee: order.deliveryFee,
    total: order.total,
    appliedCoupon: order.appliedCoupon,
    status: order.status,
    address: order.address,
    paymentMethod: order.paymentMethod,
    notes: order.notes || null,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

const sanitizeOrders = (orders) => {
  if (!Array.isArray(orders)) return [];
  return orders.map((o) => sanitizeOrder(o));
};

module.exports = { sanitizeOrder, sanitizeOrders };
