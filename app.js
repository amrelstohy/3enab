require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const { initializeFirebase } = require("./config/firebase");
const userRoutes = require("./features/user.index");
const vendorRoutes = require("./features/vendor.index");
const adminRoutes = require("./features/admin.index");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const swaggerDocs = require("./swagger");
const { checkApiKey } = require("./middlewares/apiKeyAuth");
const deliveryRoutes = require("./features/delivery.index");

const app = express();
app.enable("trust proxy");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log("---- New Request ----");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("---------------------");
  next();
});

// Route separation by application type
app.use("/api/v1/admin", checkApiKey("admin"), adminRoutes); // Admin App
app.use("/api/v1/vendor", checkApiKey("vendor"), vendorRoutes); // Vendor App
app.use("/api/v1/delivery", checkApiKey("delivery"), deliveryRoutes); // Delivery App
app.use("/api/v1", checkApiKey("user"), userRoutes); // User App (Main)

swaggerDocs(app);
app.use(errorHandler);
const PORT = process.env.PORT;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Initialize Firebase Admin SDK
  try {
    initializeFirebase();
  } catch (error) {
    console.error("Failed to initialize Firebase:", error.message);
  }

  // Initialize Socket.IO
  const { initializeSocket } = require("./config/socket");
  const io = initializeSocket(server);

  // Make io available globally for use in services
  app.set("io", io);

  console.log("📡 Socket.IO initialized");
});
