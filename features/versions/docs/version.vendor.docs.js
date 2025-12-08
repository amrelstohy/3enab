/**
 * @swagger
 * tags:
 *   name: Versions - Vendor
 *   description: Version API for Vendor app
 */

/**
 * @swagger
 * /api/v1/vendor/versions/latest:
 *   get:
 *     summary: Get the latest version for Vendor app
 *     description: Retrieves the most recent app version for Vendor application
 *     tags: ["Versions - Vendor"]
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
 *                           example: "vendor"
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
