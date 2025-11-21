/**
 * @swagger
 * tags:
 *   name: Users - Delivery
 *   description: Delivery user profile management
 */

/**
 * @swagger
 * /api/v1/delivery/users/me:
 *   get:
 *     summary: Get current delivery user profile
 *     tags: [Users - Delivery]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/users/me:
 *   put:
 *     summary: Update current delivery user profile
 *     tags: [Users - Delivery]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/users/me/change-password:
 *   post:
 *     summary: Change password
 *     tags: [Users - Delivery]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/delivery/users/me/change-status:
 *   patch:
 *     summary: Change delivery status (available/busy)
 *     tags: [Users - Delivery]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
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
 *                 enum: [available, busy]
 *     responses:
 *       200:
 *         description: Status changed successfully
 *       401:
 *         description: Unauthorized
 */

module.exports = {};
