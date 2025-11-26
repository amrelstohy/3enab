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
 *   name: Items - User
 *   description: Public API endpoints for viewing items
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/categories/{menuCategoryId}/items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve all active items in a specific category
 *     tags: ["Items - User"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439010"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}:
 *   get:
 *     summary: Get a specific item by ID
 *     description: Retrieve details of a specific item
 *     tags: ["Items - User"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439010"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: Unique identifier of the item
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         item:
 *                           $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
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

/**
 * @swagger
 * /api/v1/items/{itemId}:
 *   get:
 *     summary: Get item by ID (Direct access)
 *     description: Retrieve details of a specific item by its ID directly, without needing vendor or category information
 *     tags: ["Items - User"]
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: Unique identifier of the item
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         item:
 *                           $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
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
