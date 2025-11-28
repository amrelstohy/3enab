/**
 * Socket.IO Service
 * Utility functions for emitting events to connected clients
 * Integrated with Firebase Cloud Messaging (FCM) for push notifications
 */

const {
  sendNotificationToUser,
  sendNotificationToVendor,
  sendNotificationToAllDelivery,
  sendNotificationToDriver,
} = require("./notificationService");

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
  // Send via Socket.IO
  emitToVendor(io, vendorId, "order:new", {
    message: "New order received",
    order,
  });

  // Send push notification
  sendNotificationToVendor(
    vendorId,
    {
      title: "طلب جديد",
      body: `لديك طلب جديد برقم #${order.orderNumber || order._id}`,
    },
    {
      type: "order:new",
      orderId: order._id?.toString() || order.id?.toString(),
      orderNumber: order.orderNumber?.toString() || "",
    }
  ).catch((err) =>
    console.error("Failed to send new order notification:", err)
  );
};

/**
 * Emit order status update to user, vendor, and delivery
 * @param {Object} io - Socket.IO instance
 * @param {String} userId - User ID
 * @param {Object} order - Order data
 * @param {Object} deliveryOrder - Order data with full populate for delivery (optional)
 */
const notifyOrderStatusUpdate = (io, userId, order, deliveryOrder = null) => {
  // Status text in Arabic
  const statusTextAr = {
    pending: "قيد الانتظار",
    accepted: "تم القبول",
    preparing: "قيد التحضير",
    out_for_delivery: "في الطريق",
    delivered: "تم التوصيل",
    completed: "مكتمل",
    cancelled: "ملغي",
    canceled_by_vendor: "ملغي من البائع",
    received_by_customer: "تم الاستلام",
  };

  const statusText = statusTextAr[order.status] || order.status;
  const orderId = order._id?.toString() || order.id?.toString();

  // Always notify the customer via Socket & Push
  emitToUser(io, userId, "order:status-updated", {
    message: "Order status updated",
    order,
  });

  sendNotificationToUser(
    userId,
    {
      title: "تحديث حالة الطلب",
      body: `حالة طلبك #${order.orderNumber || orderId}: ${statusText}`,
    },
    {
      type: "order:status-updated",
      orderId,
      status: order.status,
      orderNumber: order.orderNumber?.toString() || "",
    }
  ).catch((err) =>
    console.error("Failed to send status update notification to user:", err)
  );

  // Always notify the vendor about all status changes
  if (order.vendor) {
    emitToVendor(io, order.vendor.toString(), "order:status-updated", {
      message: "Order status updated",
      order,
    });

    sendNotificationToVendor(
      order.vendor.toString(),
      {
        title: "تحديث حالة الطلب",
        body: `تم تحديث حالة الطلب #${
          order.orderNumber || orderId
        } إلى: ${statusText}`,
      },
      {
        type: "order:status-updated",
        orderId,
        status: order.status,
        orderNumber: order.orderNumber?.toString() || "",
      }
    ).catch((err) =>
      console.error("Failed to send status update notification to vendor:", err)
    );
  }

  // Notify delivery users for statuses from 'preparing' onwards (only if not pickup order)
  if (!order.isPickup) {
    const deliveryStatuses = ["preparing", "out_for_delivery", "delivered"];

    if (deliveryStatuses.includes(order.status)) {
      // Use deliveryOrder if provided, otherwise use regular order
      const orderForDelivery = deliveryOrder || order;

      // If status is preparing, this is a new order available for delivery
      const eventName =
        order.status === "preparing"
          ? "order:new-delivery"
          : "order:status-updated";
      const message =
        order.status === "preparing"
          ? "New order available for delivery"
          : `Order status updated to ${order.status}`;

      emitToDelivery(io, eventName, {
        message,
        order: orderForDelivery,
      });

      // Send push notification to all delivery users
      if (order.status === "preparing") {
        sendNotificationToAllDelivery(
          {
            title: "طلب جديد متاح للتوصيل",
            body: `طلب جديد #${order.orderNumber || orderId} جاهز للتوصيل`,
          },
          {
            type: "order:new-delivery",
            orderId,
            status: order.status,
            orderNumber: order.orderNumber?.toString() || "",
          }
        ).catch((err) =>
          console.error(
            "Failed to send new delivery notification to drivers:",
            err
          )
        );
      }
    }
  }
};

/**
 * Emit order accepted notification
 * @param {Object} io - Socket.IO instance
 * @param {String} userId - Customer ID
 * @param {Object} order - Order data
 */
const notifyOrderAccepted = (io, userId, order, deliveryOrder = null) => {
  const orderId = order._id?.toString() || order.id?.toString();

  // Notify customer via Socket & Push
  emitToUser(io, userId, "order:status-updated", {
    message: "Your order has been accepted",
    order,
  });

  sendNotificationToUser(
    userId,
    {
      title: "تم قبول طلبك",
      body: `تم قبول طلبك #${order.orderNumber || orderId} وجاري التحضير`,
    },
    {
      type: "order:accepted",
      orderId,
      orderNumber: order.orderNumber?.toString() || "",
    }
  ).catch((err) =>
    console.error("Failed to send acceptance notification to user:", err)
  );

  // Only notify delivery if it's not a pickup order
  if (!order.isPickup) {
    const orderForDelivery = deliveryOrder || order;
    emitToDelivery(io, "order:new-delivery", {
      message: "New order available for delivery",
      order: orderForDelivery,
    });

    // Send push notification to all delivery drivers
    sendNotificationToAllDelivery(
      {
        title: "طلب جديد للتوصيل",
        body: `طلب جديد #${order.orderNumber || orderId} متاح للتوصيل`,
      },
      {
        type: "order:new-delivery",
        orderId,
        orderNumber: order.orderNumber?.toString() || "",
      }
    ).catch((err) =>
      console.error("Failed to send new delivery notification:", err)
    );
  }
};

/**
 * Emit order cancelled notification
 * @param {Object} io - Socket.IO instance
 * @param {String} targetId - User or Vendor ID (who receives the notification)
 * @param {Object} order - Order data
 */
const notifyOrderCancelled = (io, vendorId, order) => {
  const orderId = order._id?.toString() || order.id?.toString();
  const isCanceledByVendor = order.status === "canceled_by_vendor";

  if (isCanceledByVendor) {
    // Vendor cancelled the order → notify the user
    emitToUser(io, order.user.toString(), "order:cancelled", {
      message: "Order cancelled by vendor",
      order,
    });

    sendNotificationToUser(
      order.user.toString(),
      {
        title: "تم إلغاء الطلب",
        body: `تم إلغاء طلبك #${order.orderNumber || orderId} من قبل البائع`,
      },
      {
        type: "order:cancelled",
        orderId,
        status: order.status,
        orderNumber: order.orderNumber?.toString() || "",
      }
    ).catch((err) =>
      console.error("Failed to send cancellation notification to user:", err)
    );
  } else {
    // User cancelled the order → notify the vendor
    emitToVendor(io, vendorId, "order:cancelled", {
      message: "Order cancelled by customer",
      order,
    });

    sendNotificationToVendor(
      vendorId,
      {
        title: "تم إلغاء طلب",
        body: `تم إلغاء الطلب #${order.orderNumber || orderId} من قبل العميل`,
      },
      {
        type: "order:cancelled",
        orderId,
        status: order.status,
        orderNumber: order.orderNumber?.toString() || "",
      }
    ).catch((err) =>
      console.error("Failed to send cancellation notification to vendor:", err)
    );
  }
};

/**
 * Emit order assigned to driver
 * @param {Object} io - Socket.IO instance
 * @param {String} driverId - Driver ID
 * @param {Object} order - Order data
 */
const notifyDriverAssigned = (io, driverId, order) => {
  const orderId = order._id?.toString() || order.id?.toString();

  // Send via Socket.IO
  emitToUser(io, driverId, "order:assigned", {
    message: "You have been assigned to a new order",
    order,
  });

  // Send push notification
  sendNotificationToDriver(
    driverId,
    {
      title: "تم تعيين طلب لك",
      body: `تم تعيين طلب جديد #${order.orderNumber || orderId} لك للتوصيل`,
    },
    {
      type: "order:assigned",
      orderId,
      orderNumber: order.orderNumber?.toString() || "",
    }
  ).catch((err) =>
    console.error("Failed to send driver assignment notification:", err)
  );
};

/**
 * Emit order delivered notification
 * @param {Object} io - Socket.IO instance
 * @param {String} userId - User ID
 * @param {String} vendorId - Vendor ID
 * @param {Object} order - Order data
 */
const notifyOrderDelivered = (io, userId, vendorId, order) => {
  const orderId = order._id?.toString() || order.id?.toString();

  // Notify customer via Socket & Push
  emitToUser(io, userId, "order:delivered", {
    message: "Your order has been delivered",
    order,
  });

  // Notify vendor via Socket & Push
  emitToVendor(io, vendorId, "order:status-updated", {
    message: "Order has been delivered",
    order,
  });

  sendNotificationToUser(
    userId,
    {
      title: "تم توصيل طلبك",
      body: `تم توصيل طلبك #${order.orderNumber || orderId} بنجاح`,
    },
    {
      type: "order:delivered",
      orderId,
      orderNumber: order.orderNumber?.toString() || "",
    }
  ).catch((err) =>
    console.error("Failed to send delivery notification to user:", err)
  );

  sendNotificationToVendor(
    vendorId,
    {
      title: "تم توصيل الطلب",
      body: `تم توصيل الطلب #${order.orderNumber || orderId} بنجاح`,
    },
    {
      type: "order:delivered",
      orderId,
      orderNumber: order.orderNumber?.toString() || "",
    }
  ).catch((err) =>
    console.error("Failed to send delivery notification to vendor:", err)
  );
};

/**
 * Emit new preparing order to all delivery users
 * @param {Object} io - Socket.IO instance
 * @param {Object} order - Order data
 */
const notifyPreparingOrder = (io, order) => {
  // Only notify delivery if it's not a pickup order
  if (!order.isPickup) {
    const orderId = order._id?.toString() || order.id?.toString();

    // Send via Socket.IO
    emitToDelivery(io, "order:new-delivery", {
      message: "New order is being prepared and ready for pickup",
      order,
    });

    // Send push notification to all delivery users
    sendNotificationToAllDelivery(
      {
        title: "طلب قيد التحضير",
        body: `طلب جديد #${
          order.orderNumber || orderId
        } قيد التحضير وجاهز للاستلام`,
      },
      {
        type: "order:preparing",
        orderId,
        orderNumber: order.orderNumber?.toString() || "",
      }
    ).catch((err) =>
      console.error("Failed to send preparing notification to drivers:", err)
    );
  }
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
  notifyDriverAssigned,
  notifyOrderDelivered,
  notifyPreparingOrder,
};
