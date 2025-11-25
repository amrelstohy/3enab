/**
 * @swagger
 * tags:
 *   name: FCM Tokens
 *   description: Firebase Cloud Messaging token management for push notifications
 */

/**
 * @swagger
 * /api/v1/fcm-token:
 *   post:
 *     summary: Register or update FCM token for push notifications
 *     tags: [FCM Tokens]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fcmToken
 *             properties:
 *               fcmToken:
 *                 type: string
 *                 description: Firebase Cloud Messaging token from the mobile app
 *                 example: "eY2xMjhBU0lqMFdSRElEOldGRk1FOjRrM1hQb0..."
 *     responses:
 *       200:
 *         description: FCM token registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "FCM token registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     fcmToken:
 *                       type: string
 *                       example: "eY2xMjhBU0lqMFdSRElEOldGRk1FOjRrM1hQb0..."
 *       400:
 *         description: Bad request - FCM token is required
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/fcm-token:
 *   delete:
 *     summary: Remove FCM token (on logout or disable notifications)
 *     tags: [FCM Tokens]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: FCM token removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "FCM token removed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/fcm-token:
 *   get:
 *     summary: Get FCM token status
 *     tags: [FCM Tokens]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: FCM token status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     hasToken:
 *                       type: boolean
 *                       example: true
 *                     tokenPreview:
 *                       type: string
 *                       nullable: true
 *                       example: "eY2xMjhBU0lqMFdSRElE..."
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NotificationTypes:
 *       type: object
 *       description: Types of push notifications sent by the system
 *       properties:
 *         order:new:
 *           type: string
 *           description: New order notification (sent to vendor)
 *           example: "لديك طلب جديد برقم #12345"
 *         order:status-updated:
 *           type: string
 *           description: Order status update notification
 *           example: "حالة طلبك #12345: قيد التحضير"
 *         order:new-delivery:
 *           type: string
 *           description: New order available for delivery (sent to all delivery users)
 *           example: "طلب جديد #12345 متاح للتوصيل"
 *         order:assigned:
 *           type: string
 *           description: Order assigned to delivery driver
 *           example: "تم تعيين طلب جديد #12345 لك للتوصيل"
 *         order:cancelled:
 *           type: string
 *           description: Order cancelled notification
 *           example: "تم إلغاء الطلب #12345"
 *         order:delivered:
 *           type: string
 *           description: Order delivered notification
 *           example: "تم توصيل طلبك #12345 بنجاح"
 */

module.exports = {};
