const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth.middleware");

// User Routes (Main App - /api/v1/)
const authRoutes = require("./auth/auth.routes");
const userUserRoutes = require("./users/routes/user.user.routes");
const vendorUserRoutes = require("./vendors/routes/vendor.user.routes");
const adUserRoutes = require("./ads/routes/ad.user.routes");
const vendorCategoryUserRoutes = require("./vendorCategories/routes/vendorCategory.user.routes");
const couponUserRoutes = require("./coupons/routes/coupon.user.routes");
const deliveryAreaUserRoutes = require("./deliveryArea/routes/deliverArea.user.routes");
const orderUserRoutes = require("./orders/routes/order.user.routes");
const itemDirectRoutes = require("./items/routes/item.direct.routes");

// Public endpoints for users
router.use("/auth", authRoutes);
router.use("/users", isAuth, userUserRoutes);
router.use("/vendors", vendorUserRoutes); // Only GET endpoints accessible
router.use("/ads", adUserRoutes);
router.use("/vendorCategories", vendorCategoryUserRoutes);
router.use("/coupons", isAuth, couponUserRoutes);
router.use("/deliveryAreas", isAuth, deliveryAreaUserRoutes);
router.use("/orders", isAuth, orderUserRoutes);
router.use("/items", itemDirectRoutes);

module.exports = router;
