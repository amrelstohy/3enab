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
 *           description: Base price of the item
 *           example: 25.99
 *         prepTime:
 *           type: number
 *           description: Preparation time in minutes
 *           example: 15
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the item was last updated
 *     CreateItemRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - basePrice
 *       properties:
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
 *           description: Base price of the item
 *           example: 25.99
 *         prepTime:
 *           type: number
 *           description: Preparation time in minutes
 *           example: 15
 *     UpdateItemRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Updated name of the item
 *           example: "Updated Pizza Name"
 *         description:
 *           type: string
 *           description: Updated description of the item
 *           example: "Updated description"
 *         basePrice:
 *           type: number
 *           description: Updated base price of the item
 *           example: 29.99
 *         prepTime:
 *           type: number
 *           description: Updated preparation time in minutes
 *           example: 20
 *     UpdateStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [active, inactive, available, unavailable]
 *           description: New status for the item
 *           example: "active"
 *     UpdateDiscountRequest:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [percentage, fixed]
 *           description: Type of discount
 *           example: "percentage"
 *         value:
 *           type: number
 *           description: Discount value
 *           example: 20
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Discount start date
 *           example: "2024-01-01T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: Discount end date
 *           example: "2024-12-31T23:59:59.999Z"
 *         isActive:
 *           type: boolean
 *           description: Whether the discount is active
 *           example: true
 *     UpdateOrderRequest:
 *       type: object
 *       required:
 *         - orderedArray
 *       properties:
 *         orderedArray:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of item IDs in the desired order
 *           example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
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
 *   name: Items - Vendor
 *   description: Vendor API endpoints for managing items
 */

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items:
 *   post:
 *     summary: Create a new item
 *     description: Create a new item in a specific category (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *           example: "507f1f77bcf86cd799439010"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItemRequest'
 *           examples:
 *             basic_item:
 *               summary: Basic item
 *               value:
 *                 name: "Delicious Pizza"
 *                 description: "Fresh pizza with premium ingredients"
 *                 basePrice: 25.99
 *                 prepTime: 15
 *     responses:
 *       201:
 *         description: Item created successfully
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
 *       401:
 *         description: Unauthorized
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}:
 *   put:
 *     summary: Update an item
 *     description: Update an existing item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Unique identifier of the item to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateItemRequest'
 *           examples:
 *             update_item:
 *               summary: Update item details
 *               value:
 *                 name: "Updated Pizza Name"
 *                 description: "Updated description"
 *                 basePrice: 29.99
 *                 prepTime: 20
 *     responses:
 *       200:
 *         description: Item updated successfully
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}:
 *   delete:
 *     summary: Delete an item
 *     description: Delete an existing item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Unique identifier of the item to delete
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Item deleted successfully
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
 *                   example: "Item deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}/image:
 *   post:
 *     summary: Upload item image
 *     description: Upload an image for an existing item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPG, PNG, WEBP)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *       400:
 *         description: Bad request - Invalid file format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}/status:
 *   patch:
 *     summary: Update item status
 *     description: Update the status of an existing item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Unique identifier of the item to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusRequest'
 *           examples:
 *             update_status:
 *               summary: Update item status
 *               value:
 *                 status: "active"
 *     responses:
 *       200:
 *         description: Item status updated successfully
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}/discount:
 *   patch:
 *     summary: Update item discount
 *     description: Update discount information for an existing item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Unique identifier of the item to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDiscountRequest'
 *           examples:
 *             percentage_discount:
 *               summary: Percentage discount
 *               value:
 *                 type: "percentage"
 *                 value: 20
 *                 startDate: "2024-01-01T00:00:00.000Z"
 *                 endDate: "2024-12-31T23:59:59.999Z"
 *                 isActive: true
 *             fixed_discount:
 *               summary: Fixed amount discount
 *               value:
 *                 type: "fixed"
 *                 value: 5
 *                 startDate: "2024-01-01T00:00:00.000Z"
 *                 endDate: "2024-12-31T23:59:59.999Z"
 *                 isActive: true
 *     responses:
 *       200:
 *         description: Item discount updated successfully
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}/discount:
 *   delete:
 *     summary: Remove item discount
 *     description: Remove discount information from an existing item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Unique identifier of the item to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Item discount removed successfully
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/order:
 *   patch:
 *     summary: Update items order
 *     description: Update the order of items within a category (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *           example: "507f1f77bcf86cd799439010"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderRequest'
 *           examples:
 *             update_order:
 *               summary: Update items order
 *               value:
 *                 orderedArray: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *     responses:
 *       200:
 *         description: Items order updated successfully
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Missing items
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}/availability:
 *   patch:
 *     summary: Update item availability
 *     description: Update the availability status of an item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Item ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isAvailable
 *             properties:
 *               isAvailable:
 *                 type: boolean
 *                 description: Item availability status
 *                 example: true
 *     responses:
 *       200:
 *         description: Item availability updated successfully
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
 *                   example: "Item availability updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       409:
 *         description: Conflict - Item availability is already set to this value
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/items/{itemId}/active:
 *   patch:
 *     summary: Update item active status
 *     description: Update the active status of an item (Vendor only)
 *     tags: ["Items - Vendor"]
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
 *         description: Item ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: Item active status
 *                 example: true
 *     responses:
 *       200:
 *         description: Item active status updated successfully
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
 *                   example: "Item active status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item:
 *                       $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       409:
 *         description: Conflict - Item active status is already set to this value
 *       500:
 *         description: Internal server error
 */
