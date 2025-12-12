/**
 * @swagger
 * components:
 *   schemas:
 *     SendToUsersRequest:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - userIds
 *       properties:
 *         title:
 *           type: string
 *           description: Notification title
 *           example: "رسالة خاصة 📩"
 *         body:
 *           type: string
 *           description: Notification body/message
 *           example: "لديك تحديث مهم يخص حسابك"
 *         userIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs to send notification to
 *           example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *         data:
 *           type: object
 *           description: Additional data to send with the notification
 *           example:
 *             type: "account_update"
 *             action: "verify_email"
 *     SendToUsersResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Notification sent successfully"
 *         data:
 *           type: object
 *           properties:
 *             success:
 *               type: number
 *               description: Number of notifications sent successfully
 *               example: 5
 *             failed:
 *               type: number
 *               description: Number of notifications that failed
 *               example: 1
 *             totalTargeted:
 *               type: number
 *               description: Total number of users targeted
 *               example: 6
 *     BroadcastNotificationRequest:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: Notification title
 *           example: "عرض خاص! 🎉"
 *         body:
 *           type: string
 *           description: Notification body/message
 *           example: "احصل على خصم 20% على جميع الطلبات اليوم فقط!"
 *         targetType:
 *           type: string
 *           enum: [all, user, vendor, delivery, admin]
 *           description: Target user type for the notification
 *           default: "all"
 *           example: "user"
 *         data:
 *           type: object
 *           description: Additional data to send with the notification
 *           example:
 *             promoCode: "SALE20"
 *             expiresAt: "2024-12-31T23:59:59.999Z"
 *     BroadcastNotificationResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Notification sent to 150 users successfully"
 *         data:
 *           type: object
 *           properties:
 *             success:
 *               type: number
 *               description: Number of notifications sent successfully
 *               example: 150
 *             failed:
 *               type: number
 *               description: Number of notifications that failed
 *               example: 5
 *             totalTargeted:
 *               type: number
 *               description: Total number of users targeted
 *               example: 155
 * tags:
 *   name: Notifications - Admin
 *   description: Admin API endpoints for sending notifications
 */

/**
 * @swagger
 * /api/v1/admin/notifications/broadcast:
 *   post:
 *     summary: Send broadcast notification to users
 *     description: Send a push notification to all users or a specific user type (Admin only)
 *     tags: ["Notifications - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BroadcastNotificationRequest'
 *           examples:
 *             all_users:
 *               summary: Send to all users
 *               value:
 *                 title: "عرض خاص! 🎉"
 *                 body: "احصل على خصم 20% على جميع الطلبات اليوم فقط!"
 *                 targetType: "all"
 *                 data:
 *                   promoCode: "SALE20"
 *             only_customers:
 *               summary: Send to customers only
 *               value:
 *                 title: "منتجات جديدة 🆕"
 *                 body: "تصفح أحدث المنتجات المضافة في تطبيقنا"
 *                 targetType: "user"
 *             only_vendors:
 *               summary: Send to vendors only
 *               value:
 *                 title: "تحديث هام للبائعين 📢"
 *                 body: "تم تحديث سياسة العمولات، يرجى مراجعة التفاصيل"
 *                 targetType: "vendor"
 *             only_delivery:
 *               summary: Send to delivery drivers only
 *               value:
 *                 title: "مكافآت إضافية 💰"
 *                 body: "أكمل 10 طلبات اليوم واحصل على مكافأة!"
 *                 targetType: "delivery"
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BroadcastNotificationResponse'
 *       400:
 *         description: Bad request - Missing required fields
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
 *                   example: "Title and body are required"
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
 *       500:
 *         description: Internal server error
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
 *                   example: "Failed to send notifications"
 */

/**
 * @swagger
 * /api/v1/admin/notifications/send-to-users:
 *   post:
 *     summary: Send notification to specific users
 *     description: Send a push notification to specific users by their IDs (Admin only)
 *     tags: ["Notifications - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendToUsersRequest'
 *           examples:
 *             single_user:
 *               summary: Send to a single user
 *               value:
 *                 title: "رسالة خاصة 📩"
 *                 body: "لديك تحديث مهم يخص حسابك"
 *                 userIds: ["507f1f77bcf86cd799439011"]
 *             multiple_users:
 *               summary: Send to multiple users
 *               value:
 *                 title: "عرض حصري لعملائنا المميزين 🌟"
 *                 body: "احصل على خصم 30% كعميل مميز!"
 *                 userIds: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *                 data:
 *                   promoCode: "VIP30"
 *                   type: "exclusive_offer"
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendToUsersResponse'
 *       400:
 *         description: Bad request - Missing required fields or invalid userIds
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
 *                   example: "userIds must be a non-empty array"
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
 *       500:
 *         description: Internal server error
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
 *                   example: "Failed to send notifications"
 */
