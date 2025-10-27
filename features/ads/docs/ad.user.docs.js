/**
 * @swagger
 * components:
 *   schemas:
 *     Ad:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the ad
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Name of the advertisement
 *           example: "Summer Sale 2024"
 *         link:
 *           type: string
 *           description: Optional link for the advertisement
 *           example: "https://example.com/sale"
 *         imagePath:
 *           type: string
 *           nullable: true
 *           description: Path to the ad image
 *           example: "/uploads/ads/507f1f77bcf86cd799439011.jpg"
 *         isActive:
 *           type: boolean
 *           description: Whether the ad is currently active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the ad was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the ad was last updated
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
 *   name: Ads - User
 *   description: Public API endpoints for viewing advertisements
 */

/**
 * @swagger
 * /api/v1/ads:
 *   get:
 *     summary: Get all advertisements
 *     description: Retrieve a list of all active advertisements with pagination and filtering support
 *     tags: ["Ads - User"]
 *     parameters:
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
 *         description: Number of ads per page
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
 *           enum: [createdAt, name]
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
 *         description: Advertisements retrieved successfully
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
 *                         ads:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Ad'
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/ads/{adId}:
 *   get:
 *     summary: Get a specific advertisement by ID
 *     description: Retrieve details of a specific advertisement
 *     tags: ["Ads - User"]
 *     parameters:
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Unique identifier of the advertisement
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Advertisement retrieved successfully
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
 *                         ad:
 *                           $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Advertisement not found
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
