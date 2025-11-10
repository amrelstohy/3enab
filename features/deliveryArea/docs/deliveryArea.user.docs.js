/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryArea:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Delivery area ID
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         name:
 *           type: string
 *           description: Delivery area name
 *           example: "Downtown"
 *         deliveryFee:
 *           type: number
 *           description: Delivery fee for this area
 *           example: 15
 *         estimatedTime:
 *           type: number
 *           description: Estimated delivery time in minutes
 *           example: 30
 *         isActive:
 *           type: boolean
 *           description: Whether the delivery area is active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Delivery Areas - User
 *   description: User API endpoints for viewing delivery areas
 */

/**
 * @swagger
 * /api/v1/deliveryAreas:
 *   get:
 *     summary: Get all active delivery areas
 *     description: User endpoint to retrieve all active delivery areas (sorted by name)
 *     tags: ["Delivery Areas - User"]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search by delivery area name
 *     responses:
 *       200:
 *         description: Delivery areas retrieved successfully
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
 *                   example: "Delivery areas fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deliveryAreas:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DeliveryArea'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

module.exports = {};
