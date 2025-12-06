const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth.middleware');

const orderDeliveryRoutes = require('./orders/routes/order.delivery.routes');
const userDeliveryRoutes = require('./users/routes/user.delivery.routes');
const userFCMRoutes = require('./users/routes/user.fcm.routes');
const authRoutes = require('./auth/auth.routes');
const versionDeliveryRoutes = require('./versions/routes/version.delivery.routes');

router.use('/auth', authRoutes);
router.use('/fcm-token', userFCMRoutes); // FCM token management (all users)
router.use('/orders', isAuth, orderDeliveryRoutes);
router.use('/users', isAuth, userDeliveryRoutes);
router.use('/versions', versionDeliveryRoutes);

module.exports = router;
