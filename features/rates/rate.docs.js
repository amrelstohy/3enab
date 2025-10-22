/**
 * @swagger
 * components:
 *   schemas:
 *     Rate:
 *       type: object
 *       required:
 *         - rate
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
 *           description: Date when the rate was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the rate was last updated
 *     RateWithUser:
 *       type: object
 *       required:
 *         - rate
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
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: User ID
 *               example: "507f1f77bcf86cd799439013"
 *             name:
 *               type: string
 *               description: User name
 *               example: "Ahmed Mohamed"
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
 *           description: Date when the rate was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the rate was last updated
 *     CreateRateRequest:
 *       type: object
 *       required:
 *         - rate
 *       properties:
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
 *     UpdateRateRequest:
 *       type: object
 *       properties:
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Updated rating value (1-5 stars)
 *           example: 5
 *         comment:
 *           type: string
 *           description: Updated comment about the rating
 *           example: "Excellent service, highly recommended!"
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
 *   name: Rates
 *   description: API endpoints for managing vendor ratings
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/rates:
 *   post:
 *     summary: Create a new rating for a vendor
 *     description: Allows authenticated users to rate a vendor
 *     tags: [Rates]
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
 *         description: Unique identifier of the vendor to rate
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRateRequest'
 *           examples:
 *             basic_rating:
 *               summary: Basic rating
 *               value:
 *                 rate: 4
 *             rating_with_comment:
 *               summary: Rating with comment
 *               value:
 *                 rate: 5
 *                 comment: "Excellent service, highly recommended!"
 *     responses:
 *       201:
 *         description: Rating created successfully
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
 *                         rate:
 *                           $ref: '#/components/schemas/Rate'
 *       401:
 *         description: Unauthorized - Authentication required
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
 *       409:
 *         description: User has already rated this vendor
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
 * /api/v1/vendors/{vendorId}/rates:
 *   get:
 *     summary: Get all ratings for a vendor
 *     description: Retrieve all ratings for a specific vendor with pagination support
 *     tags: [Rates]
 *     parameters:
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
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         rates:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/RateWithUser'
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
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
 * /api/v1/vendors/{vendorId}/rates/{rateId}:
 *   get:
 *     summary: Get a specific rating by ID
 *     description: Retrieve details of a specific rating
 *     tags: [Rates]
 *     parameters:
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
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         rate:
 *                           $ref: '#/components/schemas/RateWithUser'
 *       404:
 *         description: Rating or vendor not found
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
 * /api/v1/vendors/{vendorId}/rates/{rateId}:
 *   put:
 *     summary: Update a rating
 *     description: Update an existing rating (owner only)
 *     tags: [Rates]
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
 *         description: Unique identifier of the rating to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRateRequest'
 *           examples:
 *             update_rating:
 *               summary: Update rating details
 *               value:
 *                 rate: 5
 *                 comment: "Updated: Even better than before!"
 *     responses:
 *       200:
 *         description: Rating updated successfully
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
 *                         rate:
 *                           $ref: '#/components/schemas/Rate'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Rating or vendor not found
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
 * /api/v1/vendors/{vendorId}/rates/{rateId}:
 *   delete:
 *     summary: Delete a rating
 *     description: Delete an existing rating (owner only)
 *     tags: [Rates]
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
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Rating or vendor not found
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
