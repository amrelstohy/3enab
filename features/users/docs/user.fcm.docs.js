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
 *     summary: Register FCM token for push notifications (supports up to 10 devices)
 *     description: Adds a new FCM token to user's device list. If token already exists, no action taken. If user has 10 tokens, oldest one is removed.
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
 *                     fcmTokens:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["eY2xMjhBU0lqMFdSRElEOldGRk1FOjRrM1hQb0..."]
 *                     tokenCount:
 *                       type: integer
 *                       example: 2
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
 *     description: If fcmToken is provided in body, removes only that token. If no fcmToken provided, removes all tokens.
 *     tags: [FCM Tokens]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fcmToken:
 *                 type: string
 *                 description: Specific FCM token to remove (optional - if not provided, all tokens are removed)
 *                 example: "eY2xMjhBU0lqMFdSRElEOldGRk1FOjRrM1hQb0..."
 *     responses:
 *       200:
 *         description: FCM token(s) removed successfully
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
 *                     remainingTokens:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/fcm-token:
 *   get:
 *     summary: Get FCM tokens status
 *     description: Returns information about all registered FCM tokens for the user
 *     tags: [FCM Tokens]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: FCM tokens status retrieved successfully
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
 *                     hasTokens:
 *                       type: boolean
 *                       example: true
 *                     tokenCount:
 *                       type: integer
 *                       example: 3
 *                     tokenPreviews:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["eY2xMjhBU0lqMFdSRElE...", "fX3yNkhCVTJrNFTEJFV..."]
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
