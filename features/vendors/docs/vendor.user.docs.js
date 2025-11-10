/**
 * @swagger
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Vendor ID
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Vendor name
 *           example: "Pizza Palace"
 *         description:
 *           type: string
 *           description: Vendor description
 *           example: "Best pizza in town"
 *         category:
 *           type: string
 *           description: Vendor category ID
 *           example: "507f1f77bcf86cd799439013"
 *         workingHours:
 *           type: object
 *           properties:
 *             open:
 *               type: string
 *               example: "09:00"
 *             close:
 *               type: string
 *               example: "21:00"
 *             days:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 *         logoPath:
 *           type: string
 *           nullable: true
 *           description: Path to vendor logo
 *           example: "/uploads/vendorsLogos/507f1f77bcf86cd799439011.jpg"
 *         averageRate:
 *           type: number
 *           description: Average rating
 *           example: 4.5
 *         totalRates:
 *           type: integer
 *           description: Total number of rates
 *           example: 150
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Vendors - User
 *   description: Public user API endpoints for viewing vendors
 */

/**
 * @swagger
 * /api/v1/vendors:
 *   get:
 *     summary: Get all active vendors
 *     description: Public endpoint to retrieve all active vendors with pagination
 *     tags: ["Vendors - User"]
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search by vendor name
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *           default: 1
 *         description: Page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *           default: 10
 *         description: Items per page
 *       - name: orderBy
 *         in: query
 *         schema:
 *           type: string
 *           default: "createdAt"
 *         description: Sort field
 *       - name: order
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Vendors retrieved successfully
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
 *                   example: "Vendors fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendors:
 *                       type: object
 *                       properties:
 *                         vendors:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Vendor'
 *                         total:
 *                           type: number
 *                           example: 50
 *                         page:
 *                           type: number
 *                           example: 1
 *                         limit:
 *                           type: number
 *                           example: 10
 *                         totalPages:
 *                           type: number
 *                           example: 5
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}:
 *   get:
 *     summary: Get vendor by ID
 *     description: Public endpoint to retrieve a specific active vendor
 *     tags: ["Vendors - User"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor retrieved successfully
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
 *                   example: "Vendor fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/logo:
 *   get:
 *     summary: Get vendor logo
 *     description: Public endpoint to retrieve vendor logo image
 *     tags: ["Vendors - User"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Logo retrieved successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Logo not found
 *       500:
 *         description: Internal server error
 */

module.exports = {};
