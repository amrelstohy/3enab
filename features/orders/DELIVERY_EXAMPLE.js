/**
 * مثال على استخدام Delivery System API
 *
 * هذا الملف يحتوي على أمثلة عملية لكيفية استخدام API endpoints
 * الخاصة بنظام التوصيل مع Socket.IO
 */

// ====================================
// 1. إعداد Socket.IO Connection
// ====================================

const io = require("socket.io-client");

const setupDeliverySocket = (accessToken) => {
  const socket = io("http://localhost:3000", {
    auth: {
      token: accessToken,
    },
    transports: ["websocket", "polling"],
  });

  // عند الاتصال بنجاح
  socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);
    console.log("📍 Joined room: delivery:all");
  });

  // استقبال طلب جديد في حالة preparing
  socket.on("order:preparing", (data) => {
    console.log("🆕 New order preparing:", data);
    console.log("Order Number:", data.order.orderNumber);
    console.log("Vendor:", data.order.vendor?.name);
    console.log("Total:", data.order.total);

    // هنا يمكن عرض notification للسائق
    // showNotification(data);
  });

  // استقبال طلب تم قبوله من المطعم
  socket.on("order:accepted", (data) => {
    console.log("✅ Order accepted by restaurant:", data);
    // عرض notification
  });

  // استقبال تعيين طلب للسائق الحالي
  socket.on("order:assigned", (data) => {
    console.log("🚚 Order assigned to you:", data);
    console.log("Order ID:", data.order._id);
    console.log("Address:", data.order.address);

    // الانتقال لصفحة تفاصيل الطلب
    // navigateToOrderDetails(data.order._id);
  });

  // استقبال تحديث حالة الطلب (preparing, out_for_delivery, delivered)
  socket.on("order:status-updated", (data) => {
    console.log("🔄 Order status updated:", data);
    console.log("New Status:", data.order.status);
    console.log("Order Number:", data.order.orderNumber);
    // تحديث الواجهة حسب الحالة الجديدة
  });

  // استقبال طلب في حالة توصيل
  socket.on("order:out-for-delivery", (data) => {
    console.log("🚚 Order out for delivery:", data);
    console.log("Order Number:", data.order.orderNumber);
    console.log("Status:", data.order.status);
    // تحديث حالة الطلب في الواجهة
  });

  // استقبال تأكيد تسليم الطلب
  socket.on("order:delivered", (data) => {
    console.log("✅ Order delivered:", data);
    console.log("Order Number:", data.order.orderNumber);
    // عرض رسالة نجاح
  });

  // عند فصل الاتصال
  socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
  });

  // في حالة حدوث خطأ
  socket.on("error", (error) => {
    console.error("❌ Socket error:", error);
  });

  return socket;
};

// ====================================
// 2. API Request Helper Functions
// ====================================

const API_BASE_URL = "http://localhost:3000/api/v1/delivery";
const API_KEY = "your_delivery_api_key"; // من ملف .env

// Helper function للـ API requests
const apiRequest = async (endpoint, options = {}) => {
  const accessToken = "your_access_token"; // من login

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ====================================
// 3. الحصول على الطلبات المتاحة
// ====================================

const getAvailableOrders = async (status = null) => {
  try {
    const queryParams = status ? `?status=${status}` : "";
    const response = await apiRequest(`/orders/available${queryParams}`);

    console.log("📦 Available Orders:", response.data.orders.length);
    response.data.orders.forEach((order) => {
      console.log(`
        Order #${order.orderNumber}
        Status: ${order.status}
        Vendor: ${order.vendor?.name}
        Total: ${order.total} EGP
        Address: ${order.address?.street}, ${order.address?.city}
      `);
    });

    return response.data.orders;
  } catch (error) {
    console.error("Error fetching available orders:", error);
    return [];
  }
};

// مثال الاستخدام:
// getAvailableOrders();
// getAvailableOrders('preparing');

// ====================================
// 4. قبول طلب وتعيين السائق
// ====================================

const acceptOrder = async (orderId) => {
  try {
    const response = await apiRequest(`/orders/${orderId}/assign`, {
      method: "POST",
    });

    console.log("✅ Order accepted successfully!");
    console.log("Order Number:", response.data.order.orderNumber);
    console.log("Status:", response.data.order.status); // out_for_delivery
    console.log("Assigned Driver:", response.data.order.assignedDriver);

    // عرض معلومات الطلب للسائق
    displayOrderForDelivery(response.data.order);

    return response.data.order;
  } catch (error) {
    console.error("Error accepting order:", error.message);
    throw error;
  }
};

// مثال الاستخدام:
// acceptOrder('order_id_here');

// ====================================
// 5. الحصول على طلبات السائق
// ====================================

const getMyOrders = async (status = null) => {
  try {
    const queryParams = status ? `?status=${status}` : "";
    const response = await apiRequest(`/orders/my-orders${queryParams}`);

    console.log("📋 My Orders:", response.data.orders.length);
    response.data.orders.forEach((order) => {
      console.log(`
        Order #${order.orderNumber}
        Status: ${order.status}
        Customer: ${order.user?.name}
        Phone: ${order.user?.phone}
        Address: ${order.address?.street}
        Total: ${order.total} EGP
      `);
    });

    return response.data.orders;
  } catch (error) {
    console.error("Error fetching my orders:", error);
    return [];
  }
};

// مثال الاستخدام:
// getMyOrders();
// getMyOrders('out_for_delivery');
// getMyOrders('delivered');

// ====================================
// 6. الحصول على تفاصيل طلب معين
// ====================================

const getOrderDetails = async (orderId) => {
  try {
    const response = await apiRequest(`/orders/${orderId}`);

    const order = response.data.order;
    console.log("📦 Order Details:");
    console.log("Order Number:", order.orderNumber);
    console.log("Status:", order.status);
    console.log("Customer:", order.user?.name, "|", order.user?.phone);
    console.log("Vendor:", order.vendor?.name, "|", order.vendor?.phone);
    console.log("Items:", order.items.length);
    console.log("Total:", order.total, "EGP");
    console.log("Payment:", order.paymentMethod);
    console.log("Is Pickup:", order.isPickup);

    if (!order.isPickup && order.address) {
      console.log("Delivery Address:");
      console.log("  Street:", order.address.street);
      console.log("  City:", order.address.city);
      console.log("  Building:", order.address.buildingNumber);
      console.log("  Floor:", order.address.floor);
      console.log("  Apartment:", order.address.apartmentNumber);
      console.log("  Phone:", order.address.phone);
    }

    if (order.notes) {
      console.log("Notes:", order.notes);
    }

    return order;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// مثال الاستخدام:
// getOrderDetails('order_id_here');

// ====================================
// 7. تحديث حالة الطلب إلى "تم التوصيل"
// ====================================

const markOrderAsDelivered = async (orderId) => {
  try {
    const response = await apiRequest(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "delivered",
      }),
    });

    console.log("✅ Order delivered successfully!");
    console.log("Order Number:", response.data.order.orderNumber);
    console.log("Final Status:", response.data.order.status);

    // عرض رسالة نجاح للسائق
    // showSuccessMessage('تم تسليم الطلب بنجاح');

    return response.data.order;
  } catch (error) {
    console.error("Error marking order as delivered:", error.message);
    throw error;
  }
};

// مثال الاستخدام:
// markOrderAsDelivered('order_id_here');

// ====================================
// 8. Helper Functions
// ====================================

const displayOrderForDelivery = (order) => {
  console.log("\n========================================");
  console.log("🚚 NEW DELIVERY ORDER");
  console.log("========================================");
  console.log(`Order #${order.orderNumber}`);
  console.log(`Total: ${order.total} EGP`);
  console.log("----------------------------------------");
  console.log("📍 Pickup Location:");
  console.log(`   ${order.vendor?.name}`);
  console.log(`   ${order.vendor?.phone}`);
  console.log("----------------------------------------");

  if (!order.isPickup) {
    console.log("📍 Delivery Address:");
    console.log(`   ${order.address?.street}`);
    console.log(
      `   Building: ${order.address?.buildingNumber}, Floor: ${order.address?.floor}`
    );
    console.log(`   Apt: ${order.address?.apartmentNumber}`);
    console.log(`   Phone: ${order.address?.phone || order.user?.phone}`);
  } else {
    console.log("🏃 Customer Pickup Order");
  }

  console.log("----------------------------------------");
  console.log("👤 Customer:");
  console.log(`   ${order.user?.name}`);
  console.log(`   ${order.user?.phone}`);
  console.log("========================================\n");
};

// ====================================
// 9. مثال عملي كامل - Workflow
// ====================================

const deliveryWorkflow = async () => {
  console.log("🚀 Starting Delivery Driver Workflow...\n");

  try {
    // 1. الاتصال بالـ Socket
    console.log("1️⃣ Connecting to Socket.IO...");
    const socket = setupDeliverySocket("your_access_token");

    // انتظار الاتصال
    await new Promise((resolve) => {
      socket.on("connect", resolve);
    });

    // 2. الحصول على الطلبات المتاحة
    console.log("\n2️⃣ Fetching available orders...");
    const availableOrders = await getAvailableOrders("preparing");

    if (availableOrders.length === 0) {
      console.log("❌ No orders available at the moment");
      return;
    }

    // 3. اختيار أول طلب وقبوله
    console.log("\n3️⃣ Accepting first order...");
    const firstOrder = availableOrders[0];
    const acceptedOrder = await acceptOrder(firstOrder._id);

    // 4. عرض معلومات الطلب
    console.log("\n4️⃣ Order accepted! Getting details...");
    await getOrderDetails(acceptedOrder._id);

    // 5. محاكاة عملية التوصيل
    console.log("\n5️⃣ Simulating delivery process...");
    console.log("🚗 Driver is on the way...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("🏢 Picked up from vendor...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("🏠 Arrived at customer location...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 6. تحديث حالة الطلب إلى تم التوصيل
    console.log("\n6️⃣ Marking order as delivered...");
    await markOrderAsDelivered(acceptedOrder._id);

    // 7. الحصول على طلبات السائق التي تم تسليمها
    console.log("\n7️⃣ Fetching delivered orders...");
    await getMyOrders("delivered");

    console.log("\n✅ Workflow completed successfully!");
  } catch (error) {
    console.error("❌ Workflow error:", error);
  }
};

// ====================================
// Export Functions
// ====================================

module.exports = {
  setupDeliverySocket,
  getAvailableOrders,
  acceptOrder,
  getMyOrders,
  getOrderDetails,
  markOrderAsDelivered,
  deliveryWorkflow,
};

// ====================================
// لتشغيل المثال:
// ====================================
// node features/orders/DELIVERY_EXAMPLE.js
// أو استدعاء الدوال من ملف آخر:
// const { deliveryWorkflow } = require('./features/orders/DELIVERY_EXAMPLE');
// deliveryWorkflow();
