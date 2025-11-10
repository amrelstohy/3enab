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
 *         owner:
 *           type: string
 *           description: Owner user ID
 *           example: "507f1f77bcf86cd799439012"
 *         logoPath:
 *           type: string
 *           nullable: true
 *           description: Path to vendor logo
 *           example: "/uploads/vendorsLogos/507f1f77bcf86cd799439011.jpg"
 *         isActive:
 *           type: boolean
 *           description: Whether the vendor is active
 *           example: true
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
 *   name: Vendors - Admin
 *   description: Admin API endpoints for managing all vendors
 */

/**
 * @swagger
 * /api/v1/admin/vendors:
 *   get:
 *     summary: Get all vendors for admin
 *     description: Admin-only endpoint to retrieve all vendors including inactive ones
 *     tags: ["Vendors - Admin"]
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/vendors/{vendorId}:
 *   get:
 *     summary: Get vendor by ID
 *     description: Admin-only endpoint to retrieve a specific vendor
 *     tags: ["Vendors - Admin"]
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/vendors/{vendorId}/active:
 *   patch:
 *     summary: Update vendor active status
 *     description: Admin-only endpoint to activate or deactivate a vendor
 *     tags: ["Vendors - Admin"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
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
 *                 example: true
 *     responses:
 *       200:
 *         description: Vendor active status updated successfully
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
 *                   example: "Vendor active status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vendor not found
 *       409:
 *         description: Vendor active status is already set to this value
 *       500:
 *         description: Internal server error
 */

module.exports = {};
