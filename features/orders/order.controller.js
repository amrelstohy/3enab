const orderService = require('./order.service');
const {
  getIO,
  notifyNewOrder,
  notifyOrderStatusUpdate,
  notifyOrderAccepted,
  notifyOrderCancelled,
} = require('../../utils/socketService');

// POST /preview
const previewOrder = async (req, res) => {
  const pricing = await orderService.previewOrder(req.user, req.body);
  res.status(200).json({
    status: 'success',
    message: 'Order preview calculated successfully',
    data: pricing,
  });
};

// POST /
const createOrder = async (req, res) => {
  const io = getIO(req);
  const order = await orderService.createOrder(req.user, req.body, io);
  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    data: { order },
  });
};

// GET /
const getOrders = async (req, res) => {
  // Get status from query - can be single value or array (e.g., ?status=pending&status=shipped)
  let statuses = [];
  if (req.query.status) {
    if (Array.isArray(req.query.status)) {
      statuses = req.query.status;
    } else {
      statuses = [req.query.status];
    }
  }
  const orders = await orderService.getOrders(req.user, statuses);
  res.status(200).json({
    status: 'success',
    message: 'Orders fetched successfully',
    data: { orders },
  });
};

// GET /:orderId
const getOrder = async (req, res) => {
  const order = await orderService.getOrder(req.order);
  res.status(200).json({
    status: 'success',
    message: 'Order fetched successfully',
    data: { order },
  });
};

// GET /:id (alias for getOrder - used by delivery routes)
const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id, req.user);
  res.status(200).json({
    status: 'success',
    message: 'Order fetched successfully',
    data: { order },
  });
};

// DELETE /:orderId (soft cancel)
const deleteOrder = async (req, res) => {
  const io = getIO(req);
  const order = await orderService.cancelOrder(req.order, io);
  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully',
    data: { order },
  });
};

// GET / (vendor) - Get all orders for vendor's restaurants
const getVendorOrders = async (req, res) => {
  // Get status from query - can be single value or array (e.g., ?status=pending&status=preparing)
  let statuses = [];
  if (req.query.status) {
    if (Array.isArray(req.query.status)) {
      statuses = req.query.status;
    } else {
      statuses = [req.query.status];
    }
  }
  const orders = await orderService.getVendorOrders(
    req.user,
    statuses,
    req.query.vendorId
  );
  res.status(200).json({
    status: 'success',
    message: 'Orders fetched successfully',
    data: { orders },
  });
};

// GET /:orderId (vendor) - Get single order
const getVendorOrder = async (req, res) => {
  const order = await orderService.getVendorOrder(req.order);
  res.status(200).json({
    status: 'success',
    message: 'Order fetched successfully',
    data: { order },
  });
};

// PATCH /:orderId/status (vendor) - Update order status
const updateOrderStatus = async (req, res) => {
  const io = getIO(req);
  const { status, rejectionReason } = req.body;
  const order = await orderService.updateOrderStatus(
    req.user,
    req.order,
    status,
    rejectionReason,
    io
  );
  res.status(200).json({
    status: 'success',
    message: 'Order status updated successfully',
    data: { order },
  });
};

// DELETE /:orderId (vendor) - Cancel order by vendor
const cancelOrderByVendor = async (req, res) => {
  const io = getIO(req);
  const { rejectionReason } = req.body;
  const order = await orderService.cancelOrderByVendor(
    req.user,
    req.order,
    rejectionReason,
    io
  );
  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully by vendor',
    data: { order },
  });
};

// GET / (delivery) - Get all orders ready for delivery
const getDeliveryOrders = async (req, res) => {
  // Get status from query - can be single value or array
  let statuses = [];
  if (req.query.status) {
    if (Array.isArray(req.query.status)) {
      statuses = req.query.status;
    } else {
      statuses = [req.query.status];
    }
  }
  const orders = await orderService.getDeliveryOrders(statuses);
  res.status(200).json({
    status: 'success',
    message: 'Delivery orders fetched successfully',
    data: { orders },
  });
};

// POST /:orderId/assign (delivery) - Assign driver to order
const assignDriver = async (req, res) => {
  const io = getIO(req);
  const order = await orderService.assignDeliveryDriver(
    req.order,
    req.user._id,
    io
  );
  res.status(200).json({
    status: 'success',
    message: 'Driver assigned successfully',
    data: { order },
  });
};

// PATCH /:orderId/status (delivery) - Update order status by delivery
const updateDeliveryStatus = async (req, res) => {
  const io = getIO(req);
  const { status } = req.body;
  const order = await orderService.updateDeliveryOrderStatus(
    req.order,
    req.user._id,
    status,
    io
  );
  res.status(200).json({
    status: 'success',
    message: 'Order status updated successfully',
    data: { order },
  });
};

// GET /my-orders (delivery) - Get driver's assigned orders
const getMyDeliveryOrders = async (req, res) => {
  // Get status from query - can be single value or array
  let statuses = [];
  if (req.query.status) {
    if (Array.isArray(req.query.status)) {
      statuses = req.query.status;
    } else {
      statuses = [req.query.status];
    }
  }
  const orders = await orderService.getDriverOrders(req.user._id, statuses);
  res.status(200).json({
    status: 'success',
    message: 'Your delivery orders fetched successfully',
    data: { orders },
  });
};

module.exports = {
  previewOrder,
  createOrder,
  getOrders,
  getOrder,
  getOrderById,
  deleteOrder,
  getVendorOrders,
  getVendorOrder,
  updateOrderStatus,
  cancelOrderByVendor,
  getDeliveryOrders,
  assignDriver,
  updateDeliveryStatus,
  getMyDeliveryOrders,
};
