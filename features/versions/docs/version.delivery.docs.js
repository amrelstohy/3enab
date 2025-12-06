/**
 * @swagger
 * tags:
 *   name: Versions - Delivery
 *   description: Version API for Delivery app
 */

/**
 * @swagger
 * /api/v1/delivery/versions/latest:
 *   get:
 *     summary: Get the latest version for Delivery app
 *     description: Retrieves the most recent app version for Delivery application
 *     tags: ["Versions - Delivery"]
 *     parameters:
 *       - name: platform
 *         in: query
 *         required: true
 *         description: Platform type
 *         schema:
 *           type: string
 *           enum: [android, ios]
 *           example: "android"
 *     responses:
 *       200:
 *         description: Latest version fetched successfully
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
 *                   example: "Latest version fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     version:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *                         appType:
 *                           type: string
 *                           example: "delivery"
 *                         platform:
 *                           type: string
 *                           example: "android"
 *                         version:
 *                           type: string
 *                           example: "1.2.0"
 *                         minVersion:
 *                           type: string
 *                           example: "1.0.0"
 *                         mandatory:
 *                           type: boolean
 *                           example: false
 *       404:
 *         description: No version found
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
 *                   example: "No version found"
 *       500:
 *         description: Internal server error
 */
