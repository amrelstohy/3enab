/**
 * @swagger
 * components:
 *   schemas:
 *     MenuCategory:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the menu category
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         name:
 *           type: string
 *           description: Menu category name
 *           example: "Burgers"
 *         description:
 *           type: string
 *           description: Menu category description
 *           example: "All burger items"
 *         vendor:
 *           type: string
 *           description: Vendor ID this menu category belongs to
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *         isActive:
 *           type: boolean
 *           description: Whether the menu category is active
 *           example: true
 *         order:
 *           type: integer
 *           description: Ordering index within the vendor
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateMenuCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           example: "Burgers"
 *         description:
 *           type: string
 *           example: "All burger items"
 *     UpdateMenuCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Hot Burgers"
 *         description:
 *           type: string
 *           example: "Spicy burgers only"
 *     UpdateMenuCategoryOrderRequest:
 *       type: object
 *       required:
 *         - orderedArray
 *       properties:
 *         orderedArray:
 *           type: array
 *           description: Array of menu category IDs in the desired order
 *           items:
 *             type: string
 *           example: ["64f1a2b3c4d5e6f7890a1111","64f1a2b3c4d5e6f7890a2222"]
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
 *   name: Menu Categories - Vendor
 *   description: Vendor API endpoints for managing menu categories
 */

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}/categories:
 *   post:
 *     summary: Create a new menu category for a vendor
 *     description: Allows vendor owner to create a menu category
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMenuCategoryRequest'
 *     responses:
 *       201:
 *         description: Menu category created successfully
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
 *                         menuCategory:
 *                           $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Vendor not found
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
 * /api/v1/vendor/vendors/{vendorId}/categories:
 *   get:
 *     summary: Get all menu categories for a vendor
 *     description: Owner-only endpoint to retrieve all menu categories for their vendor
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *     responses:
 *       200:
 *         description: Menu categories retrieved successfully
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
 *                         menuCategories:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Vendor not found
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}:
 *   get:
 *     summary: Get a single menu category by ID
 *     description: Owner-only endpoint to retrieve a specific menu category
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Menu category ID
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     responses:
 *       200:
 *         description: Menu category retrieved successfully
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
 *                         menuCategory:
 *                           $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Menu category not found
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
 *   put:
 *     summary: Update a menu category
 *     description: Owner-only endpoint to update menu category
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Menu category ID
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuCategoryRequest'
 *     responses:
 *       200:
 *         description: Menu category updated successfully
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
 *                         menuCategory:
 *                           $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Menu category not found
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}:
 *   delete:
 *     summary: Delete a menu category
 *     description: Owner-only endpoint to delete menu category
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Menu category ID
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     responses:
 *       200:
 *         description: Menu category deleted successfully
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
 *                   example: "Menu category deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Menu category not found
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
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/active:
 *   patch:
 *     summary: Update menu category active status
 *     description: Owner-only endpoint to update the active status of a menu category
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Menu category ID
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
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
 *                 description: Menu category active status
 *                 example: true
 *     responses:
 *       200:
 *         description: Menu category active status updated successfully
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
 *                   example: "Menu category active status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     menuCategory:
 *                       $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Menu category not found
 *       409:
 *         description: Conflict - Menu category active status is already set to this value
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}/categories/{menuCategoryId}/update-order:
 *   patch:
 *     summary: Update ordering for menu categories
 *     description: Owner-only endpoint to reorder menu categories for a vendor
 *     tags: ["Menu Categories - Vendor"]
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
 *           example: "64f1a2b3c4d5e6f7890a5678"
 *       - name: menuCategoryId
 *         in: path
 *         required: true
 *         description: Menu category ID
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuCategoryOrderRequest'
 *     responses:
 *       200:
 *         description: Menu category order updated successfully
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
 *                         menuCategories:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Menu category or vendor not found
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
