const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth.middleware");

// Admin Routes (Admin App - /api/v1/admin/)
const authRoutes = require("./auth/auth.routes");
const userAdminRoutes = require("./users/routes/user.admin.routes");
const vendorAdminRoutes = require("./vendors/routes/vendor.admin.routes");
const adAdminRoutes = require("./ads/routes/ad.admin.routes");
const vendorCategoryAdminRoutes = require("./vendorCategories/routes/vendorCategory.admin.routes");
const couponAdminRoutes = require("./coupons/routes/coupon.admin.routes");
const deliveryAreaAdminRoutes = require("./deliveryArea/routes/deliverArea.admin.routes");

// Admin endpoints - full CRUD access
router.use("/auth", authRoutes);
router.use("/users", isAuth, userAdminRoutes); // Admin user profile management
router.use("/vendors", isAuth, vendorAdminRoutes);
router.use("/ads", isAuth, adAdminRoutes);
router.use("/vendorCategories", isAuth, vendorCategoryAdminRoutes);
router.use("/coupons", isAuth, couponAdminRoutes);
router.use("/deliveryAreas", isAuth, deliveryAreaAdminRoutes);

module.exports = router;
