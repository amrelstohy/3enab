/**
 * @swagger
 * components:
 *   schemas:
 *     VendorCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the vendor category
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         name:
 *           type: string
 *           description: Vendor category name
 *           example: "Restaurants"
 *         description:
 *           type: string
 *           description: Vendor category description
 *           example: "All restaurant vendors"
 *         imagePath:
 *           type: string
 *           nullable: true
 *           description: Path to the vendor category image
 *           example: "/uploads/vendorCategories/64f1a2b3c4d5e6f7890a1234.jpg"
 *         isActive:
 *           type: boolean
 *           description: Whether the vendor category is active
 *           example: true
 *         order:
 *           type: integer
 *           description: Ordering index for display
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Vendor Categories - Vendor
 *   description: Vendor API endpoints for viewing vendor categories
 */

/**
 * @swagger
 * /api/v1/vendor/vendorCategories:
 *   get:
 *     summary: Get all active vendor categories
 *     description: Vendor endpoint to retrieve all active vendor categories ordered by position
 *     tags: ["Vendor Categories - Vendor"]
 *     responses:
 *       200:
 *         description: Vendor categories retrieved successfully
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
 *                   example: "Vendor categories fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VendorCategory'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendor/vendorCategories/{vendorCategoryId}:
 *   get:
 *     summary: Get a vendor category by ID
 *     description: Vendor endpoint to fetch a single vendor category
 *     tags: ["Vendor Categories - Vendor"]
 *     parameters:
 *       - name: vendorCategoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor category
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     responses:
 *       200:
 *         description: Vendor category retrieved successfully
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
 *                   example: "Vendor category fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategory:
 *                       $ref: '#/components/schemas/VendorCategory'
 *       404:
 *         description: Vendor category not found
 *       500:
 *         description: Internal server error
 */
