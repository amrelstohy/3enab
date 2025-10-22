const express = require("express");
const router = express.Router();
const authRoutes = require("./auth/auth.routes");
const userRoutes = require("./users/user.routes");
const vendorRoutes = require("./vendors/vendor.routes");
const adRoutes = require("./ads/ad.routes");
const vendorCategoryRoutes = require("./vendorCategories/vendorCategory.routes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/vendors", vendorRoutes);
router.use("/ads", adRoutes);
router.use("/vendorCategories", vendorCategoryRoutes);

module.exports = router;
