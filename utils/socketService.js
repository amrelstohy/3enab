/**
 * Socket.IO Service
 * Utility functions for emitting events to connected clients
 */

/**
 * Get Socket.IO instance from app
 */
const getIO = (req) => {
  if (req && req.app) {
    return req.app.get("io");
  }
  // Fallback: try to get from global if available
  return global.io;
};

/**
 * Emit event to a specific user
 * @param {String} userId - User ID
 * @param {String} event - Event name
 * @param {Object} data - Data to send
 */
const emitToUser = (io, userId, event, data) => {
  if (!io) {
    console.warn("Socket.IO not initialized");
    return;
  }
  io.to(`user:${userId}`).emit(event, data);
  console.log(`📤 Emitted ${event} to user: ${userId}`);
};

/**
 * Emit event to a vendor room with retry
 * @param {Object} io - Socket.IO instance
 * @param {String} vendorId - Vendor ID
 * @param {String} event - Event name
 * @param {Object} data - Data to send
 * @param {number} retries - Number of retry attempts (default 3)
 */
const emitToVendor = (io, vendorId, event, data, retries = 3) => {
  if (!io) {
    console.warn("Socket.IO not initialized");
    return;
  }

  try {
    io.to(`vendor:${vendorId}`).emit(event, data);
    console.log(`📤 Emitted ${event} to vendor: ${vendorId}`);
  } catch (err) {
    console.error(`❌ Failed to emit ${event} to vendor:${vendorId}`, err);
    if (retries > 0) {
      console.log(`🔁 Retrying in 1s... (${retries} attempts left)`);
      setTimeout(() => {
        emitToVendor(io, vendorId, event, data, retries - 1);
      }, 1000);
    } else {
      console.error(
        `⚠️ Could not emit ${event} to vendor:${vendorId} after multiple attempts`
      );
    }
  }
};

/**
 * Emit event to all delivery users
 * @param {String} event - Event name
 * @param {Object} data - Data to send
 */
const emitToDelivery = (io, event, data) => {
  if (!io) {
    console.warn("Socket.IO not initialized");
    return;
  }
  io.to("delivery:all").emit(event, data);
  console.log(`📤 Emitted ${event} to all delivery users`);
};

/**
 * Emit event to all admin users
 * @param {String} event - Event name
 * @param {Object} data - Data to send
 */
const emitToAdmin = (io, event, data) => {
  if (!io) {
    console.warn("Socket.IO not initialized");
    return;
  }
  io.to("admin:all").emit(event, data);
  console.log(`📤 Emitted ${event} to all admin users`);
};

/**
 * Emit new order event to vendor
 * @param {Object} io - Socket.IO instance
 * @param {String} vendorId - Vendor ID
 * @param {Object} order - Order data
 */
const notifyNewOrder = (io, vendorId, order) => {
  emitToVendor(io, vendorId, "order:new", {
    message: "New order received",
    order,
  });
};

/**
 * Emit order status update to user
 * @param {Object} io - Socket.IO instance
 * @param {String} userId - User ID
 * @param {Object} order - Order data
 */
const notifyOrderStatusUpdate = (io, userId, order) => {
  emitToUser(io, userId, "order:status-updated", {
    message: "Order status updated",
    order,
  });
};

/**
 * Emit order accepted to delivery
 * @param {Object} io - Socket.IO instance
 * @param {Object} order - Order data
 */
const notifyOrderAccepted = (io, order) => {
  emitToDelivery(io, "order:accepted", {
    message: "New order available for delivery",
    order,
  });
};

/**
 * Emit order cancelled to vendor
 * @param {Object} io - Socket.IO instance
 * @param {String} vendorId - Vendor ID
 * @param {Object} order - Order data
 */
const notifyOrderCancelled = (io, vendorId, order) => {
  emitToVendor(io, vendorId, "order:cancelled", {
    message: "Order cancelled",
    order,
  });
};

module.exports = {
  getIO,
  emitToUser,
  emitToVendor,
  emitToDelivery,
  emitToAdmin,
  notifyNewOrder,
  notifyOrderStatusUpdate,
  notifyOrderAccepted,
  notifyOrderCancelled,
};
