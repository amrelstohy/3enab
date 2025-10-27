require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./features/user.index");
const vendorRoutes = require("./features/vendor.index");
const adminRoutes = require("./features/admin.index");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const swaggerDocs = require("./swagger");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Route separation by application type
app.use("/api/v1/admin", adminRoutes); // Admin App
app.use("/api/v1/vendor", vendorRoutes); // Vendor App
app.use("/api/v1", userRoutes); // User App (Main)

swaggerDocs(app);
app.use(errorHandler);
const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
