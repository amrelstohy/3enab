/**
 * @swagger
 * components:
 *   schemas:
 *     AdminOrderItem:
 *       type: object
 *       properties:
 *         item:
 *           type: object
 *           description: Item details (populated)
 *           properties:
 *             _id:
 *               type: string
 *               description: Item ID
 *               example: "64f1a2b3c4d5e6f7890a1234"
 *             name:
 *               type: string
 *               description: Item name
 *               example: "Margherita Pizza"
 *             imagePath:
 *               type: string
 *               description: Item image path
 *               example: "uploads/items/pizza.jpg"
 *             category:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1a2b3c4d5e6f7890a1111"
 *                 name:
 *                   type: string
 *                   example: "Pizza"
 *         quantity:
 *           type: number
 *           description: Item quantity
 *           example: 2
 *         unitPrice:
 *           type: number
 *           description: Unit price at time of order
 *           example: 50
 *         totalPrice:
 *           type: number
 *           description: Total price for this item (unitPrice * quantity)
 *           example: 100
 *         optionId:
 *           type: string
 *           nullable: true
 *           description: ID of the selected item option (if applicable)
 *           example: "64f1a2b3c4d5e6f7890a5555"
 *         optionValue:
 *           type: string
 *           nullable: true
 *           description: Value of the selected item option (e.g., "Large", "1kg")
 *           example: "Large"
 *     AdminOrder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Order ID
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         orderNumber:
 *           type: number
 *           description: Order number (unique per vendor)
 *           example: 1
 *         user:
 *           type: object
 *           description: User details (populated)
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f1a2b3c4d5e6f7890a5678"
 *             name:
 *               type: string
 *               example: "John Doe"
 *             phone:
 *               type: string
 *               example: "+201234567890"
 *             email:
 *               type: string
 *               example: "john@example.com"
 *         vendor:
 *           type: object
 *           description: Vendor details (populated)
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f1a2b3c4d5e6f7890a9999"
 *             name:
 *               type: string
 *               example: "Pizza House"
 *             logoPath:
 *               type: string
 *               example: "uploads/vendors/logo.jpg"
 *         assignedDriver:
 *           type: object
 *           nullable: true
 *           description: Assigned driver details (if any)
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f1a2b3c4d5e6f7890a6666"
 *             name:
 *               type: string
 *               example: "Driver Name"
 *             phone:
 *               type: string
 *               example: "+201234567890"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AdminOrderItem'
 *           description: Order items
 *         subtotal:
 *           type: number
 *           description: Subtotal before discount and delivery
 *           example: 150
 *         discount:
 *           type: number
 *           description: Discount amount
 *           example: 20
 *         deliveryFee:
 *           type: number
 *           description: Delivery fee
 *           example: 15
 *         total:
 *           type: number
 *           description: Total amount (subtotal - discount + deliveryFee)
 *           example: 145
 *         appliedCoupon:
 *           type: object
 *           nullable: true
 *           description: Applied coupon details (if any)
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f1a2b3c4d5e6f7890a8888"
 *             code:
 *               type: string
 *               example: "SAVE20"
 *             discount:
 *               type: number
 *               example: 20
 *             discountType:
 *               type: string
 *               enum: [percentage, fixed]
 *               example: "percentage"
 *         status:
 *           type: string
 *           enum: [pending, preparing, out_for_delivery, delivered, completed, received_by_customer, cancelled, canceled_by_vendor]
 *           description: Order status
 *           example: "pending"
 *         address:
 *           type: object
 *           description: Delivery address details (populated)
 *         paymentMethod:
 *           type: string
 *           enum: [cash, credit_card, wallet]
 *           description: Payment method
 *           example: "cash"
 *         isPickup:
 *           type: boolean
 *           description: Whether the order is for pickup or delivery
 *           example: false
 *         notes:
 *           type: string
 *           nullable: true
 *           description: Additional notes
 *           example: "Please ring the bell twice"
 *         rejectionReason:
 *           type: string
 *           nullable: true
 *           description: Reason for rejection (if cancelled by vendor)
 *           example: "Out of stock"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Orders - Admin
 *   description: Admin API endpoints for managing orders
 */

/**
 * @swagger
 * /api/v1/admin/orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     description: |
 *       Admin endpoint to retrieve all orders in the system.
 *       Can filter by multiple statuses using query parameters.
 *
 *       **Examples:**
 *       - Get all orders: `GET /api/v1/admin/orders`
 *       - Get pending orders: `GET /api/v1/admin/orders?status=pending`
 *       - Get multiple statuses: `GET /api/v1/admin/orders?status=pending&status=preparing&status=out_for_delivery`
 *     tags: ["Orders - Admin"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: status
 *         in: query
 *         required: false
 *         description: |
 *           Filter orders by status. Can specify multiple times for multiple statuses.
 *           Available statuses: pending, preparing, out_for_delivery, delivered, completed, received_by_customer, cancelled, canceled_by_vendor
 *         schema:
 *           oneOf:
 *             - type: string
 *               enum: [pending, preparing, out_for_delivery, delivered, completed, received_by_customer, cancelled, canceled_by_vendor]
 *             - type: array
 *               items:
 *                 type: string
 *                 enum: [pending, preparing, out_for_delivery, delivered, completed, received_by_customer, cancelled, canceled_by_vendor]
 *         style: form
 *         explode: true
 *         examples:
 *           single:
 *             summary: Single status
 *             value: "pending"
 *           multiple:
 *             summary: Multiple statuses
 *             value: ["pending", "preparing"]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Orders fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AdminOrder'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Admin access required"
 */

/**
 * @swagger
 * /api/v1/admin/orders/{id}:
 *   get:
 *     summary: Get order by ID (Admin)
 *     description: Admin endpoint to retrieve a specific order by its ID with full details including user, vendor, driver, and coupon information.
 *     tags: ["Orders - Admin"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: "64f1a2b3c4d5e6f7890a1234"
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Order fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/AdminOrder'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 */

/**
 * @swagger
 * /api/v1/admin/orders/{id}:
 *   delete:
 *     summary: Delete order permanently (Admin)
 *     description: |
 *       Admin endpoint to permanently delete an order from the database.
 *
 *       **⚠️ Warning:** This is a hard delete operation. The order will be permanently removed from the database and cannot be recovered.
 *     tags: ["Orders - Admin"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: "64f1a2b3c4d5e6f7890a1234"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Order deleted permanently"
 *                 data:
 *                   type: "null"
 *                   example: null
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 */

module.exports = {};
