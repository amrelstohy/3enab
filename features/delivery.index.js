const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth.middleware");

const orderDeliveryRoutes = require("./orders/routes/order.delivery.routes");
const userDeliveryRoutes = require("./users/routes/user.delivery.routes");
const authRoutes = require("./auth/auth.routes");

router.use("/auth", authRoutes);
router.use("/orders", isAuth, orderDeliveryRoutes);
router.use("/users", isAuth, userDeliveryRoutes);

module.exports = router;
