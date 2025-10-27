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
 *   name: Menu Categories - Admin
 *   description: Admin API endpoints for managing menu categories
 */

/**
 * @swagger
 * /api/v1/admin/vendors/{vendorId}/categories:
 *   get:
 *     summary: Get all menu categories for admin
 *     description: Admin-only endpoint to retrieve all menu categories including inactive ones for a specific vendor
 *     tags: ["Menu Categories - Admin"]
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
 *     responses:
 *       200:
 *         description: Menu categories retrieved successfully
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
 *                   example: "Menu categories fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     menuCategories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/MenuCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
