const orderService = require("./order.service");
const {
  getIO,
  notifyNewOrder,
  notifyOrderStatusUpdate,
  notifyOrderAccepted,
  notifyOrderCancelled,
} = require("../../utils/socketService");

// POST /preview
const previewOrder = async (req, res) => {
  const pricing = await orderService.previewOrder(req.user, req.body);
  res.status(200).json({
    status: "success",
    message: "Order preview calculated successfully",
    data: pricing,
  });
};

// POST /
const createOrder = async (req, res) => {
  const io = getIO(req);
  const order = await orderService.createOrder(req.user, req.body, io);
  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    data: { order },
  });
};

// GET /
const getOrders = async (req, res) => {
  const orders = await orderService.getOrders(req.user, req.query.status);
  res.status(200).json({
    status: "success",
    message: "Orders fetched successfully",
    data: { orders },
  });
};

// GET /:orderId
const getOrder = async (req, res) => {
  const order = await orderService.getOrder(req.order);
  res.status(200).json({
    status: "success",
    message: "Order fetched successfully",
    data: { order },
  });
};

// PUT /:orderId
const updateOrder = async (req, res) => {
  const io = getIO(req);
  const order = await orderService.updateOrder(
    req.user,
    req.order,
    req.body,
    io
  );
  res.status(200).json({
    status: "success",
    message: "Order updated successfully",
    data: { order },
  });
};

// DELETE /:orderId (soft cancel)
const deleteOrder = async (req, res) => {
  const io = getIO(req);
  const order = await orderService.cancelOrder(req.order, io);
  res.status(200).json({
    status: "success",
    message: "Order cancelled successfully",
    data: { order },
  });
};

// GET / (vendor) - Get all orders for vendor's restaurants
const getVendorOrders = async (req, res) => {
  const orders = await orderService.getVendorOrders(
    req.user,
    req.query.status,
    req.query.vendorId
  );
  res.status(200).json({
    status: "success",
    message: "Orders fetched successfully",
    data: { orders },
  });
};

// GET /:orderId (vendor) - Get single order
const getVendorOrder = async (req, res) => {
  const order = await orderService.getVendorOrder(req.order);
  res.status(200).json({
    status: "success",
    message: "Order fetched successfully",
    data: { order },
  });
};

// PATCH /:orderId/status (vendor) - Update order status
const updateOrderStatus = async (req, res) => {
  const io = getIO(req);
  const { status } = req.body;
  const order = await orderService.updateOrderStatus(req.order, status, io);
  res.status(200).json({
    status: "success",
    message: "Order status updated successfully",
    data: { order },
  });
};

module.exports = {
  previewOrder,
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getVendorOrders,
  getVendorOrder,
  updateOrderStatus,
};
