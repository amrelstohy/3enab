const express = require("express");
const router = express.Router();

// Admin Routes (Admin App - /api/v1/admin/)
const authRoutes = require("./auth/auth.routes");
const userAdminRoutes = require("./users/routes/user.admin.routes");
const vendorAdminRoutes = require("./vendors/routes/vendor.admin.routes");
const adAdminRoutes = require("./ads/routes/ad.admin.routes");
const vendorCategoryAdminRoutes = require("./vendorCategories/routes/vendorCategory.admin.routes");

// Admin endpoints - full CRUD access
router.use("/auth", authRoutes);
router.use("/users", userAdminRoutes); // Admin user profile management
router.use("/vendors", vendorAdminRoutes);
router.use("/ads", adAdminRoutes);
router.use("/vendorCategories", vendorCategoryAdminRoutes);

module.exports = router;
