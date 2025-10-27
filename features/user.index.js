const express = require("express");
const router = express.Router();

// User Routes (Main App - /api/v1/)
const authRoutes = require("./auth/auth.routes");
const userUserRoutes = require("./users/routes/user.user.routes");
const vendorUserRoutes = require("./vendors/routes/vendor.user.routes");
const adUserRoutes = require("./ads/routes/ad.user.routes");
const vendorCategoryUserRoutes = require("./vendorCategories/routes/vendorCategory.user.routes");

// Public endpoints for users
router.use("/auth", authRoutes);
router.use("/users", userUserRoutes);
router.use("/vendors", vendorUserRoutes); // Only GET endpoints accessible
router.use("/ads", adUserRoutes);
router.use("/vendorCategories", vendorCategoryUserRoutes);

module.exports = router;
