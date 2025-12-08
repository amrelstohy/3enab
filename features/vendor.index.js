const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth.middleware');

// Vendor Routes (Vendor App - /api/v1/vendor/)
const authRoutes = require('./auth/auth.routes');
const userVendorRoutes = require('./users/routes/user.vendor.routes');
const userFCMRoutes = require('./users/routes/user.fcm.routes');
const vendorVendorRoutes = require('./vendors/routes/vendor.vendor.routes');
const vendorCategoryVendorRoutes = require('./vendorCategories/routes/vendorCategory.vendor.routes');
const orderVendorRoutes = require('./orders/routes/order.vendor.routes');
const versionVendorRoutes = require('./versions/routes/version.vendor.routes');

// Vendor-specific endpoints
router.use('/auth', authRoutes);
router.use('/users', isAuth, userVendorRoutes); // Vendor user profile management
router.use('/fcm-token', userFCMRoutes); // FCM token management (all users)
router.use('/vendors', isAuth, vendorVendorRoutes); // Vendor CRUD operations on their own vendor
router.use('/vendorCategories', isAuth, vendorCategoryVendorRoutes);
router.use('/orders', isAuth, orderVendorRoutes); // Vendor order management
router.use('/versions', versionVendorRoutes);

module.exports = router;
