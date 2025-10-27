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
 *   name: Menu Categories - User
 *   description: Public API endpoints for viewing menu categories
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/categories:
 *   get:
 *     summary: Get all active menu categories for a vendor
 *     description: Public endpoint to list active menu categories ordered by position
 *     tags: ["Menu Categories - User"]
 *     parameters:
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/categories/{menuCategoryId}:
 *   get:
 *     summary: Get a menu category by ID
 *     description: Public endpoint to fetch a single active menu category
 *     tags: ["Menu Categories - User"]
 *     parameters:
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
