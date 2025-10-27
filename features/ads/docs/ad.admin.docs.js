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
 *     CreateAdRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the advertisement
 *           example: "Summer Sale 2024"
 *         link:
 *           type: string
 *           description: Optional link for the advertisement
 *           example: "https://example.com/sale"
 *     UpdateAdRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Updated name of the advertisement
 *           example: "Updated Summer Sale 2024"
 *         link:
 *           type: string
 *           description: Updated link for the advertisement
 *           example: "https://example.com/updated-sale"
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
 *   name: Ads - Admin
 *   description: Admin API endpoints for managing advertisements
 */

/**
 * @swagger
 * /api/v1/admin/ads:
 *   post:
 *     summary: Create a new advertisement
 *     description: Allows admin users to create a new advertisement
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdRequest'
 *           examples:
 *             basic_ad:
 *               summary: Basic advertisement
 *               value:
 *                 name: "Summer Sale 2024"
 *             ad_with_link:
 *               summary: Advertisement with link
 *               value:
 *                 name: "Black Friday Sale"
 *                 link: "https://example.com/black-friday"
 *     responses:
 *       201:
 *         description: Advertisement created successfully
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
 *       401:
 *         description: Unauthorized - Admin access required
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
 * /api/v1/admin/ads/{adId}:
 *   put:
 *     summary: Update an advertisement
 *     description: Update an existing advertisement (admin only)
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Unique identifier of the advertisement to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAdRequest'
 *           examples:
 *             update_ad:
 *               summary: Update advertisement details
 *               value:
 *                 name: "Updated Summer Sale 2024"
 *                 link: "https://example.com/updated-sale"
 *     responses:
 *       200:
 *         description: Advertisement updated successfully
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
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

/**
 * @swagger
 * /api/v1/admin/ads/{adId}:
 *   delete:
 *     summary: Delete an advertisement
 *     description: Delete an existing advertisement (admin only)
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Unique identifier of the advertisement to delete
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Advertisement deleted successfully
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
 *                   example: "Ad deleted successfully"
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

/**
 * @swagger
 * /api/v1/admin/ads/{adId}/image:
 *   post:
 *     summary: Upload advertisement image
 *     description: Upload an image for an existing advertisement (admin only)
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Unique identifier of the advertisement
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPG, PNG, WEBP)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *       400:
 *         description: Bad request - Invalid file format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

/**
 * @swagger
 * /api/v1/admin/ads/{adId}/activate:
 *   patch:
 *     summary: Activate an advertisement
 *     description: Activate an existing advertisement (admin only)
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Unique identifier of the advertisement to activate
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Advertisement activated successfully
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
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

/**
 * @swagger
 * /api/v1/admin/ads/{adId}/deactivate:
 *   patch:
 *     summary: Deactivate an advertisement
 *     description: Deactivate an existing advertisement (admin only)
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Unique identifier of the advertisement to deactivate
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Advertisement deactivated successfully
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
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

/**
 * @swagger
 * /api/v1/admin/ads/admin/all:
 *   get:
 *     summary: Get all ads for admin
 *     description: Admin-only endpoint to retrieve all ads with search and pagination
 *     tags: ["Ads - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search ads by name
 *         schema:
 *           type: string
 *           example: "summer"
 *       - name: orderBy
 *         in: query
 *         required: false
 *         description: Field to order by
 *         schema:
 *           type: string
 *           enum: [createdAt, name, isActive]
 *           example: "createdAt"
 *       - name: order
 *         in: query
 *         required: false
 *         description: Order direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: "desc"
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Ads retrieved successfully
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
 *                           description: Total number of ads
 *                         page:
 *                           type: integer
 *                           description: Current page number
 *                         limit:
 *                           type: integer
 *                           description: Number of items per page
 *                         totalPages:
 *                           type: integer
 *                           description: Total number of pages
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Admin access required
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
