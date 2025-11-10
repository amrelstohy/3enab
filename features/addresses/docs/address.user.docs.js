/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Address ID
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         name:
 *           type: string
 *           description: Address name/label
 *           example: "Home"
 *         user:
 *           type: string
 *           description: User ID
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *         fullAddress:
 *           type: string
 *           description: Full address text
 *           example: "123 Main St, Cairo, Egypt"
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: [longitude, latitude]
 *               example: [31.2357, 30.0444]
 *         deliveryArea:
 *           type: string
 *           description: Delivery area ID
 *           example: "64f1a2b3c4d5e6f7890a9999"
 *         isDefault:
 *           type: boolean
 *           description: Whether this is the default address
 *           example: true
 *         notes:
 *           type: string
 *           nullable: true
 *           description: Additional notes for delivery
 *           example: "Ring the bell twice"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Addresses - User
 *   description: User API endpoints for managing delivery addresses
 */

/**
 * @swagger
 * /api/v1/users/me/addresses:
 *   post:
 *     summary: Create a new address
 *     description: Create a new delivery address for the authenticated user
 *     tags: ["Addresses - User"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - fullAddress
 *               - latitude
 *               - longitude
 *               - deliveryAreaId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Home"
 *               fullAddress:
 *                 type: string
 *                 example: "123 Main St, Cairo, Egypt"
 *               latitude:
 *                 type: number
 *                 example: 30.0444
 *               longitude:
 *                 type: number
 *                 example: 31.2357
 *               deliveryAreaId:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7890a9999"
 *               isDefault:
 *                 type: boolean
 *                 example: true
 *               notes:
 *                 type: string
 *                 example: "Ring the bell twice"
 *     responses:
 *       201:
 *         description: Address created successfully
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
 *                   example: "Address created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all addresses
 *     description: Retrieve all delivery addresses for the authenticated user
 *     tags: ["Addresses - User"]
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
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
 *                   example: "Addresses fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     addresses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/users/me/addresses/default:
 *   get:
 *     summary: Get default address
 *     description: Retrieve the default delivery address for the authenticated user
 *     tags: ["Addresses - User"]
 *     responses:
 *       200:
 *         description: Default address retrieved successfully
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
 *                   example: "Default address fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No default address found
 */

/**
 * @swagger
 * /api/v1/users/me/addresses/{id}:
 *   get:
 *     summary: Get address by ID
 *     description: Retrieve a specific address by its ID
 *     tags: ["Addresses - User"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address retrieved successfully
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
 *                   example: "Address fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *   put:
 *     summary: Update address
 *     description: Update a specific address
 *     tags: ["Addresses - User"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Work"
 *               fullAddress:
 *                 type: string
 *                 example: "456 Office St, Cairo, Egypt"
 *               latitude:
 *                 type: number
 *                 example: 30.0555
 *               longitude:
 *                 type: number
 *                 example: 31.2468
 *               deliveryAreaId:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7890a9999"
 *               isDefault:
 *                 type: boolean
 *                 example: false
 *               notes:
 *                 type: string
 *                 example: "Use the back entrance"
 *     responses:
 *       200:
 *         description: Address updated successfully
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
 *                   example: "Address updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *   delete:
 *     summary: Delete address
 *     description: Delete a specific address
 *     tags: ["Addresses - User"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
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
 *                   example: "Address deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *   patch:
 *     summary: Set as default address
 *     description: Set a specific address as the default delivery address
 *     tags: ["Addresses - User"]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address set as default successfully
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
 *                   example: "Address set as default successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */

module.exports = {};
