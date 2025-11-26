/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryOrder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         orderNumber:
 *           type: number
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             phone:
 *               type: string
 *         vendor:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             phone:
 *               type: string
 *             location:
 *               type: object
 *         assignedDriver:
 *           type: string
 *           nullable: true
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               item:
 *                 type: object
 *                 description: Item details
 *               quantity:
 *                 type: number
 *                 description: Item quantity
 *               unitPrice:
 *                 type: number
 *                 description: Unit price at time of order
 *               totalPrice:
 *                 type: number
 *                 description: Total price for this item
 *               optionId:
 *                 type: string
 *                 nullable: true
 *                 description: ID of the selected item option
 *               optionValue:
 *                 type: string
 *                 nullable: true
 *                 description: Value of the selected option (e.g., "Large", "1kg")
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             buildingNumber:
 *               type: string
 *             floor:
 *               type: string
 *             apartmentNumber:
 *               type: string
 *             phone:
 *               type: string
 *         status:
 *           type: string
 *           enum: [pending, received_by_restaurant, preparing, out_for_delivery, delivered, cancelled, canceled_by_vendor]
 *         total:
 *           type: number
 *         subtotal:
 *           type: number
 *         deliveryFee:
 *           type: number
 *         discount:
 *           type: number
 *         paymentMethod:
 *           type: string
 *         isPickup:
 *           type: boolean
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/delivery/orders/available:
 *   get:
 *     summary: Get all available orders for delivery
 *     description: Retrieves all orders with status "preparing" or "out_for_delivery" that are ready for delivery pickup (excludes pickup orders where isPickup=true)
 *     tags: [Delivery - Orders]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [preparing, out_for_delivery]
 *         description: Filter orders by status (can be multiple)
 *     responses:
 *       200:
 *         description: Available orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Delivery orders fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DeliveryOrder'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/orders/my-orders:
 *   get:
 *     summary: Get driver's assigned orders
 *     description: Retrieves all orders assigned to the current delivery driver
 *     tags: [Delivery - Orders]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [out_for_delivery, delivered]
 *         description: Filter orders by status
 *     responses:
 *       200:
 *         description: Driver's orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Your delivery orders fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DeliveryOrder'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Get detailed information about a specific order
 *     tags: [Delivery - Orders]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Order fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/DeliveryOrder'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/orders/{orderId}/assign:
 *   post:
 *     summary: Assign driver to order
 *     description: Assign the current driver to a specific order and change status to "out_for_delivery"
 *     tags: [Delivery - Orders]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Driver assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Driver assigned successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/DeliveryOrder'
 *       404:
 *         description: Order not found
 *       400:
 *         description: Order is not ready for delivery assignment
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     description: Update order status to "delivered" (only assigned driver can update)
 *     tags: [Delivery - Orders]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *                 enum: [out_for_delivery, delivered]
 *                 description: New order status
 *                 example: delivered
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
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Order status updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/DeliveryOrder'
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid status or order already delivered/cancelled
 *       401:
 *         description: Unauthorized - Driver not assigned to this order
 */

/**
 * Socket.IO Events for Delivery
 *
 * All events are sent to "delivery:all" room - all delivery users receive all order updates
 *
 * Events Received by Delivery Users:
 *
 * 1. order:accepted (when vendor accepts order)
 *    - Emitted when order status changes from "pending" to "preparing"
 *    - Payload: { message: string, order: Order }
 *    - Room: delivery:all
 *
 * 2. order:preparing (when order is being prepared)
 *    - Emitted when order status becomes "preparing"
 *    - Payload: { message: "New order is being prepared and ready for pickup", order: Order }
 *    - Room: delivery:all
 *    - Note: Order items are populated with name and imagePath only
 *    - Note: Only sent for delivery orders (isPickup=false)
 *
 * 3. order:status-updated (for all status changes from 'preparing' onwards)
 *    - Emitted when order status changes to: preparing, out_for_delivery, delivered
 *    - Payload: { message: "Order status updated to {status}", order: Order }
 *    - Room: delivery:all
 *    - Note: Only sent for delivery orders (isPickup=false)
 *
 * 4. order:assigned (when driver accepts/is assigned to order)
 *    - Emitted when a driver accepts an order
 *    - Payload: { message: "You have been assigned to a new order", order: Order }
 *    - Sent to specific driver
 *
 * Events Emitted by Delivery:
 *
 * 1. Join delivery room
 *    - Room: "delivery:all"
 *    - Automatically joined on socket connection
 *
 * Usage Example:
 *
 * // Connect with authentication
 * const socket = io('http://localhost:3000', {
 *   auth: { token: 'your_access_token' }
 * });
 *
 * // Listen for new preparing orders
 * socket.on('order:preparing', (data) => {
 *   console.log('New order available:', data.order);
 *   console.log('Items:', data.order.items); // Contains item name and imagePath only
 *   // Show notification to delivery user
 * });
 *
 * // Listen for all status updates (preparing, out_for_delivery, delivered)
 * socket.on('order:status-updated', (data) => {
 *   console.log('Order status updated:', data.order.status);
 *   console.log('Order:', data.order);
 *   // Update UI based on new status
 * });
 *
 * // Listen for order assignment
 * socket.on('order:assigned', (data) => {
 *   console.log('Order assigned to you:', data.order);
 *   // Navigate to order details
 * });
 */

module.exports = {};
