/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - basePrice
 *         - category
 *         - vendor
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the item
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Name of the item
 *           example: "Delicious Pizza"
 *         description:
 *           type: string
 *           description: Description of the item
 *           example: "Fresh pizza with premium ingredients"
 *         basePrice:
 *           type: number
 *           description: Base price of the item (used when optionType is "none")
 *           example: 25.99
 *         optionType:
 *           type: string
 *           enum: [none, size, weight]
 *           description: Type of options for the item
 *           example: "size"
 *         options:
 *           type: array
 *           description: Available options for the item
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Option ID
 *                 example: "507f1f77bcf86cd799439014"
 *               value:
 *                 type: string
 *                 description: Option value (e.g., "Small", "Large", "500g")
 *                 example: "Large"
 *               price:
 *                 type: number
 *                 description: Price for this option
 *                 example: 35.99
 *               order:
 *                 type: number
 *                 description: Display order
 *                 example: 1
 *         prepTime:
 *           type: string
 *           nullable: true
 *           description: Preparation time (e.g., "15 minutes", "30-45 min")
 *           example: "15 minutes"
 *         discount:
 *           type: object
 *           nullable: true
 *           description: Discount information for the item (can be null)
 *           properties:
 *             type:
 *               type: string
 *               enum: [percentage, fixed]
 *               description: Type of discount
 *               example: "percentage"
 *             value:
 *               type: number
 *               description: Discount value
 *               example: 20
 *             startDate:
 *               type: string
 *               format: date-time
 *               nullable: true
 *               description: Discount start date
 *               example: "2024-01-01T00:00:00.000Z"
 *             endDate:
 *               type: string
 *               format: date-time
 *               nullable: true
 *               description: Discount end date
 *               example: "2024-12-31T23:59:59.999Z"
 *             isActive:
 *               type: boolean
 *               description: Whether the discount is active
 *               example: true
 *         isActive:
 *           type: boolean
 *           description: Whether the item is active
 *           example: true
 *         isAvailable:
 *           type: boolean
 *           description: Whether the item is available for ordering
 *           example: true
 *         order:
 *           type: number
 *           description: Order of the item within its category
 *           example: 1
 *         category:
 *           type: string
 *           description: Category ID the item belongs to
 *           example: "507f1f77bcf86cd799439012"
 *         vendor:
 *           type: string
 *           description: Vendor ID the item belongs to
 *           example: "507f1f77bcf86cd799439013"
 *         imagePath:
 *           type: string
 *           nullable: true
 *           description: Path to the item image
 *           example: "/uploads/items/image.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the item was last updated
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "fail"
 *         message:
 *           type: string
 *           example: "Error message"
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Operation completed successfully"
 *         data:
 *           type: object
 * tags:
 *   name: Items - Admin
 *   description: Admin API endpoints for managing items
 */

/**
 * @swagger
 * /api/v1/admin/vendors/{vendorId}/categories/{menuCategoryId}/items:
 *   get:
 *     summary: Get all items for admin
 *     description: Admin-only endpoint to retrieve all items including inactive ones for a specific menu category
 *     tags: ["Items - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Menu category ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: Items retrieved successfully
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
 *                   example: "Items fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                         items:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
