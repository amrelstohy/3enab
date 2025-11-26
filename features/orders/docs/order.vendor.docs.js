/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
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
 *     Order:
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
 *           type: string
 *           description: User ID
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *         vendor:
 *           type: string
 *           description: Vendor ID
 *           example: "64f1a2b3c4d5e6f7890a9999"
 *         assignedDriver:
 *           type: string
 *           nullable: true
 *           description: Assigned driver ID (if any)
 *           example: "64f1a2b3c4d5e6f7890a6666"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
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
 *           type: string
 *           nullable: true
 *           description: Applied coupon ID
 *           example: "64f1a2b3c4d5e6f7890a8888"
 *         status:
 *           type: string
 *           enum: [pending, received_by_restaurant, preparing, out_for_delivery, delivered, cancelled, canceled_by_vendor]
 *           description: Order status
 *           example: "pending"
 *         address:
 *           type: string
 *           description: Delivery address ID
 *           example: "64f1a2b3c4d5e6f7890a7777"
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Orders - Vendor
 *   description: Vendor API endpoints for managing orders
 */

/**
 * @swagger
 * /api/v1/vendor/orders:
 *   get:
 *     summary: Get all orders for vendor
 *     description: Retrieve all orders for vendors owned by the authenticated user. Can filter by status and specific vendor
 *     tags: ["Orders - Vendor"]
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter orders by status. Can specify multiple times (e.g., ?status=pending&status=preparing) or single value (e.g., ?status=pending)
 *         schema:
 *           type: string
 *           enum: [pending, received_by_restaurant, preparing, out_for_delivery, delivered, cancelled, canceled_by_vendor]
 *         example: "pending"
 *         allowReserved: true
 *       - name: vendorId
 *         in: query
 *         required: false
 *         description: Filter orders by specific vendor ID (if not provided, returns orders from all owned vendors)
 *         schema:
 *           type: string
 *         example: "64f1a2b3c4d5e6f7890a9999"
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
 *                         $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the vendor owner
 *       404:
 *         description: Vendor not found
 */

/**
 * @swagger
 * /api/v1/vendor/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID. Only vendors owned by the authenticated user can access their orders
 *     tags: ["Orders - Vendor"]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
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
 *                       $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the vendor owner
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/v1/vendor/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     description: Update the status of an order. Only vendors owned by the authenticated user can update their order status
 *     tags: ["Orders - Vendor"]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, received_by_restaurant, preparing, out_for_delivery, delivered, cancelled, canceled_by_vendor]
 *                 description: New order status
 *                 example: "preparing"
 *     responses:
 *       200:
 *         description: Order status updated successfully
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
 *                   example: "Order status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - Invalid status or status cannot be changed (delivered/cancelled orders)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the vendor owner
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/v1/vendor/orders/{orderId}:
 *   delete:
 *     summary: Cancel order by vendor
 *     description: Cancel an order as a vendor. Only pending orders can be cancelled. The order status will be set to "canceled_by_vendor" to differentiate from customer cancellations.
 *     tags: ["Orders - Vendor"]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled successfully
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
 *                   example: "Order cancelled successfully by vendor"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - Order cannot be cancelled (only pending orders can be cancelled)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the vendor owner
 *       404:
 *         description: Order not found
 */

module.exports = {};
