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
 *     CreateDeliveryAreaRequest:
 *       type: object
 *       required:
 *         - name
 *         - deliveryFee
 *       properties:
 *         name:
 *           type: string
 *           example: "Downtown"
 *         deliveryFee:
 *           type: number
 *           example: 15
 *         estimatedTime:
 *           type: number
 *           example: 30
 *           default: 30
 *     UpdateDeliveryAreaRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Downtown Updated"
 *         deliveryFee:
 *           type: number
 *           example: 20
 *         estimatedTime:
 *           type: number
 *           example: 45
 *         isActive:
 *           type: boolean
 *           example: true
 * tags:
 *   name: Delivery Areas - Admin
 *   description: Admin API endpoints for managing delivery areas
 */

/**
 * @swagger
 * /api/v1/admin/deliveryAreas:
 *   post:
 *     summary: Create a new delivery area
 *     description: Admin-only endpoint to create a new delivery area
 *     tags: ["Delivery Areas - Admin"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDeliveryAreaRequest'
 *     responses:
 *       201:
 *         description: Delivery area created successfully
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
 *                   example: "Delivery area created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deliveryArea:
 *                       $ref: '#/components/schemas/DeliveryArea'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Delivery area with this name already exists
 *   get:
 *     summary: Get all delivery areas
 *     description: Admin-only endpoint to retrieve all delivery areas (sorted by name)
 *     tags: ["Delivery Areas - Admin"]
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

/**
 * @swagger
 * /api/v1/admin/deliveryAreas/{deliveryAreaId}:
 *   get:
 *     summary: Get delivery area by ID
 *     description: Admin-only endpoint to retrieve a specific delivery area
 *     tags: ["Delivery Areas - Admin"]
 *     parameters:
 *       - name: deliveryAreaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery area ID
 *     responses:
 *       200:
 *         description: Delivery area retrieved successfully
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
 *                   example: "Delivery area fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deliveryArea:
 *                       $ref: '#/components/schemas/DeliveryArea'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery area not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update delivery area
 *     description: Admin-only endpoint to update a delivery area
 *     tags: ["Delivery Areas - Admin"]
 *     parameters:
 *       - name: deliveryAreaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery area ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDeliveryAreaRequest'
 *     responses:
 *       200:
 *         description: Delivery area updated successfully
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
 *                   example: "Delivery area updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deliveryArea:
 *                       $ref: '#/components/schemas/DeliveryArea'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery area not found
 *       409:
 *         description: Delivery area with this name already exists
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete delivery area
 *     description: Admin-only endpoint to delete a delivery area
 *     tags: ["Delivery Areas - Admin"]
 *     parameters:
 *       - name: deliveryAreaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery area ID
 *     responses:
 *       200:
 *         description: Delivery area deleted successfully
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
 *                   example: "Delivery area deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery area not found
 *       500:
 *         description: Internal server error
 */

module.exports = {};
