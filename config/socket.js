// socket/index.js
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../features/users/user.model");
const Vendor = require("../features/vendors/vendor.model");

/**
 * ✅ Shared Token Verification Function
 */
const verifyToken = async (token) => {
  if (!token) throw new Error("No token provided");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded.userId).lean();

  if (!user) throw new Error("User not found");
  if (!user.refreshToken) throw new Error("User not logged in");

  return user;
};

const socketAuth = async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (token) {
      const user = await verifyToken(token);
      socket.user = user;
      socket.userId = user._id.toString();
      socket.userType = user.type;
    } else {
      socket.user = null;
    }

    next();
  } catch (error) {
    console.warn("⚠️ Socket authentication failed:", error.message);
    socket.user = null;
    next();
  }
};

/**
 * ✅ Initialize Socket.IO Server
 */
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "*", // suitable for mobile apps
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // Attach middleware for auth
  io.use(socketAuth);

  // =============== MAIN AUTHENTICATED NAMESPACE ===============
  io.on("connection", async (socket) => {
    if (!socket.user) {
      console.log("⚠️ Anonymous socket connected — limited access");
      return;
    }

    console.log(`🔌 Socket connected: ${socket.userId} (${socket.userType})`);
    socket.join(`user:${socket.userId}`); // personal room for every user

    // 🏪 Vendor: join all owned vendor rooms
    if (socket.userType === "vendor") {
      const vendors = await Vendor.find({ owner: socket.userId })
        .select("_id")
        .lean();

      vendors.forEach((vendor) => {
        socket.join(`vendor:${vendor._id}`);
        console.log(`🏪 Vendor ${socket.userId} joined vendor:${vendor._id}`);
      });
    }

    // 🚚 Delivery: join general delivery room
    else if (socket.userType === "delivery") {
      socket.join("delivery:all");
      console.log(`🚚 Delivery ${socket.userId} joined delivery:all`);
    }

    // 👨‍💼 Admin: join admin room
    else if (socket.userType === "admin") {
      socket.join("admin:all");
      console.log(`👨‍💼 Admin ${socket.userId} joined admin:all`);
    }

    // 👤 User (Customer): join user general room
    else if (socket.userType === "user") {
      socket.join("user:all");
      console.log(`👤 User ${socket.userId} joined user:all`);
    }

    // Disconnect handler
    socket.on("disconnect", () => {
      console.log(`🔌 Socket disconnected: ${socket.userId || "anonymous"}`);
    });

    // Error handler
    socket.on("error", (err) => {
      console.error(`❌ Socket error for ${socket.userId || "guest"}:`, err);
    });
  });

  // =============== PUBLIC NAMESPACE (NO AUTH REQUIRED) ===============
  const publicIo = io.of("/public");

  publicIo.on("connection", (socket) => {
    console.log("🌐 Public socket connected:", socket.id);

    // simple test event
    socket.on("ping", () => {
      socket.emit("pong", { time: new Date().toISOString() });
    });

    socket.on("disconnect", () => {
      console.log("🌐 Public socket disconnected:", socket.id);
    });
  });

  // =============== EXPORT SOCKET INSTANCE ===============
  return io;
};

module.exports = { initializeSocket };
