const express = require("express");
const router = express.Router();

// Vendor Routes (Vendor App - /api/v1/vendor/)
const authRoutes = require("./auth/auth.routes");
const userVendorRoutes = require("./users/routes/user.vendor.routes");
const vendorVendorRoutes = require("./vendors/routes/vendor.vendor.routes");
const vendorCategoryVendorRoutes = require("./vendorCategories/routes/vendorCategory.vendor.routes");

// Vendor-specific endpoints
router.use("/auth", authRoutes);
router.use("/users", userVendorRoutes); // Vendor user profile management
router.use("/vendors", vendorVendorRoutes); // Vendor CRUD operations on their own vendor
router.use("/vendorCategories", vendorCategoryVendorRoutes);

module.exports = router;
