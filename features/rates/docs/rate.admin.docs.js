/**
 * @swagger
 * components:
 *   schemas:
 *     Rate:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the rate
 *           example: "507f1f77bcf86cd799439011"
 *         vendor:
 *           type: string
 *           description: ID of the vendor being rated
 *           example: "507f1f77bcf86cd799439012"
 *         user:
 *           type: string
 *           description: ID of the user who made the rating
 *           example: "507f1f77bcf86cd799439013"
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating value (1-5 stars)
 *           example: 4
 *         comment:
 *           type: string
 *           description: Optional comment about the rating
 *           example: "Great service, fast delivery!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RateWithUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         vendor:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "507f1f77bcf86cd799439013"
 *             name:
 *               type: string
 *               example: "Ahmed Mohamed"
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4
 *         comment:
 *           type: string
 *           example: "Great service, fast delivery!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Rates - Admin
 *   description: Admin API endpoints for managing vendor ratings
 */

/**
 * @swagger
 * /api/v1/admin/vendors/{vendorId}/rates:
 *   get:
 *     summary: Get all ratings for a vendor (Admin)
 *     description: Admin-only endpoint to retrieve all ratings for a vendor with pagination support
 *     tags: ["Rates - Admin"]
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
 *         description: Unique identifier of the vendor
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of rates per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - name: orderBy
 *         in: query
 *         description: Field to order by
 *         required: false
 *         schema:
 *           type: string
 *           enum: [createdAt, rate]
 *           default: createdAt
 *       - name: order
 *         in: query
 *         description: Order direction
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Ratings retrieved successfully
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
 *                   example: "Rates fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rates:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RateWithUser'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/vendors/{vendorId}/rates/{rateId}:
 *   get:
 *     summary: Get a specific rating by ID (Admin)
 *     description: Admin-only endpoint to retrieve details of a specific rating
 *     tags: ["Rates - Admin"]
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
 *         description: Unique identifier of the vendor
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *       - name: rateId
 *         in: path
 *         required: true
 *         description: Unique identifier of the rating
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Rating retrieved successfully
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
 *                   example: "Rate fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rate:
 *                       $ref: '#/components/schemas/RateWithUser'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Rating or vendor not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a rating (Admin)
 *     description: Admin-only endpoint to delete any rating
 *     tags: ["Rates - Admin"]
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
 *         description: Unique identifier of the vendor
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *       - name: rateId
 *         in: path
 *         required: true
 *         description: Unique identifier of the rating to delete
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Rating deleted successfully
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
 *                   example: "Rate deleted successfully"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Rating or vendor not found
 *       500:
 *         description: Internal server error
 */
