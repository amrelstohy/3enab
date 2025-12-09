const express = require('express');
const router = express.Router();
const orderController = require('../order.controller');
const isAdmin = require('../../../middlewares/admin.middleware');

// GET /api/v1/admin/orders - Get all orders (with optional status filter)
router.get('/', isAdmin, orderController.getAdminOrders);

// GET /api/v1/admin/orders/:id - Get order by ID
router.get('/:id', isAdmin, orderController.getAdminOrderById);

// DELETE /api/v1/admin/orders/:id - Hard delete order from database
router.delete('/:id', isAdmin, orderController.hardDeleteOrder);

module.exports = router;
