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
 *         address:
 *           type: string
 *           description: Vendor address
 *           example: "123 Main St, Cairo"
 *         phone:
 *           type: string
 *           description: Vendor phone number
 *           example: "+201234567890"
 *         owner:
 *           type: string
 *           description: Owner user ID
 *           example: "507f1f77bcf86cd799439012"
 *         logoPath:
 *           type: string
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
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Vendor'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
