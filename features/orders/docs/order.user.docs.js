/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         item:
 *           type: string
 *           description: Item ID
 *           example: "64f1a2b3c4d5e6f7890a1234"
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
 *           enum: [pending, preparing, out_for_delivery, delivered, cancelled]
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
 *     OrderPreview:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7890a1234"
 *               quantity:
 *                 type: number
 *                 example: 2
 *               unitPrice:
 *                 type: number
 *                 example: 50
 *               totalPrice:
 *                 type: number
 *                 example: 100
 *           description: Calculated order items
 *         subtotal:
 *           type: number
 *           description: Subtotal before discount
 *           example: 150
 *         coupon:
 *           type: string
 *           nullable: true
 *           description: Applied coupon code
 *           example: "SUMMER2024"
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
 *           description: Final total
 *           example: 145
 *         vendor:
 *           type: string
 *           description: Vendor ID
 *           example: "64f1a2b3c4d5e6f7890a9999"
 *         error:
 *           type: string
 *           nullable: true
 *           description: Error message if any
 * tags:
 *   name: Orders - User
 *   description: User API endpoints for managing orders
 */

/**
 * @swagger
 * /api/v1/orders/preview:
 *   post:
 *     summary: Preview order pricing
 *     description: Calculate order pricing including subtotal, discount, delivery fee, and total without creating the order
 *     tags: ["Orders - User"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItems
 *               - addressId
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - item
 *                     - quantity
 *                   properties:
 *                     item:
 *                       type: string
 *                       description: Item ID
 *                       example: "64f1a2b3c4d5e6f7890a1234"
 *                     quantity:
 *                       type: number
 *                       minimum: 1
 *                       description: Item quantity
 *                       example: 2
 *                 description: Array of cart items
 *               addressId:
 *                 type: string
 *                 description: Delivery address ID
 *                 example: "64f1a2b3c4d5e6f7890a7777"
 *               couponCode:
 *                 type: string
 *                 nullable: true
 *                 description: Optional coupon code
 *                 example: "SUMMER2024"
 *     responses:
 *       200:
 *         description: Order preview calculated successfully
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
 *                   example: "Order preview calculated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderPreview'
 *       400:
 *         description: Validation error (e.g., empty cart, invalid address, multiple vendors)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address or items not found
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders for the authenticated user.
 *     tags: ["Orders - User"]
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter orders by status. Can specify multiple times (e.g., ?status=pending&status=preparing) or single value (e.g., ?status=pending)
 *         schema:
 *           type: string
 *           enum: [pending, preparing, out_for_delivery, delivered, cancelled]
 *         example: "pending"
 *         allowReserved: true
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
 *   post:
 *     summary: Create a new order
 *     description: Create a new order using the preview calculation.
 *     tags: ["Orders - User"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItems
 *               - addressId
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - item
 *                     - quantity
 *                   properties:
 *                     item:
 *                       type: string
 *                       description: Item ID
 *                       example: "64f1a2b3c4d5e6f7890a1234"
 *                     quantity:
 *                       type: number
 *                       minimum: 1
 *                       description: Item quantity
 *                       example: 2
 *                 description: Array of cart items
 *               addressId:
 *                 type: string
 *                 description: Delivery address ID
 *                 example: "64f1a2b3c4d5e6f7890a7777"
 *               couponCode:
 *                 type: string
 *                 nullable: true
 *                 description: Optional coupon code
 *                 example: "SUMMER2024"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, credit_card, wallet]
 *                 default: cash
 *                 description: Payment method
 *                 example: "cash"
 *               notes:
 *                 type: string
 *                 maxLength: 500
 *                 nullable: true
 *                 description: Additional notes for the order
 *                 example: "Please ring the bell twice"
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                   example: "Order created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address or items not found
 */

/**
 * @swagger
 * /api/v1/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID. Only the order owner can access it
 *     tags: ["Orders - User"]
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
 *         description: Forbidden - Not the order owner
 *       404:
 *         description: Order not found
 *   delete:
 *     summary: Cancel order
 *     description: Cancel an order by changing its status to "cancelled". Only pending orders can be cancelled
 *     tags: ["Orders - User"]
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
 *                   example: "Order cancelled successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - Order cannot be cancelled (not pending)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the order owner
 *       404:
 *         description: Order not found
 */

module.exports = {};
