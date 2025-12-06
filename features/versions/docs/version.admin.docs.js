/**
 * @swagger
 * components:
 *   schemas:
 *     Version:
 *       type: object
 *       required:
 *         - version
 *         - minVersion
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the version
 *           example: "507f1f77bcf86cd799439011"
 *         version:
 *           type: string
 *           description: Current app version
 *           example: "1.2.0"
 *         minVersion:
 *           type: string
 *           description: Minimum supported version (auto-set to last mandatory version)
 *           example: "1.0.0"
 *         mandatory:
 *           type: boolean
 *           description: Whether this version update is mandatory
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the version was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the version was last updated
 *     CreateVersionRequest:
 *       type: object
 *       required:
 *         - version
 *       properties:
 *         version:
 *           type: string
 *           description: App version string
 *           example: "1.2.0"
 *         mandatory:
 *           type: boolean
 *           description: Whether this version update is mandatory
 *           example: false
 *     UpdateVersionRequest:
 *       type: object
 *       properties:
 *         version:
 *           type: string
 *           description: Updated version string
 *           example: "1.3.0"
 *         mandatory:
 *           type: boolean
 *           description: Whether this version update is mandatory
 *           example: true
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
 *   name: Versions - Admin
 *   description: Admin API endpoints for managing app versions
 */

/**
 * @swagger
 * /api/v1/admin/versions:
 *   post:
 *     summary: Create a new version
 *     description: Creates a new app version. The minVersion is automatically set to the last mandatory version.
 *     tags: ["Versions - Admin"]
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
 *             $ref: '#/components/schemas/CreateVersionRequest'
 *           examples:
 *             basic_version:
 *               summary: Basic version
 *               value:
 *                 version: "1.2.0"
 *             mandatory_version:
 *               summary: Mandatory version
 *               value:
 *                 version: "2.0.0"
 *                 mandatory: true
 *     responses:
 *       201:
 *         description: Version created successfully
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
 *                         version:
 *                           $ref: '#/components/schemas/Version'
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
 * /api/v1/admin/versions/latest:
 *   get:
 *     summary: Get the latest version
 *     description: Retrieves the most recent app version
 *     tags: ["Versions - Admin"]
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
 *         description: Latest version fetched successfully
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
 *                         version:
 *                           $ref: '#/components/schemas/Version'
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No version found
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
 * /api/v1/admin/versions:
 *   get:
 *     summary: Get all versions
 *     description: Retrieves all app versions with pagination
 *     tags: ["Versions - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: orderBy
 *         in: query
 *         required: false
 *         description: Field to order by
 *         schema:
 *           type: string
 *           enum: [createdAt, version]
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
 *         description: Versions retrieved successfully
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
 *                         versions:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Version'
 *                         total:
 *                           type: integer
 *                           description: Total number of versions
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
 * /api/v1/admin/versions/{versionId}:
 *   put:
 *     summary: Update a version
 *     description: Update an existing version (admin only). The minVersion is automatically recalculated.
 *     tags: ["Versions - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: versionId
 *         in: path
 *         required: true
 *         description: Unique identifier of the version to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVersionRequest'
 *           examples:
 *             update_version:
 *               summary: Update version details
 *               value:
 *                 version: "1.3.0"
 *                 mandatory: true
 *     responses:
 *       200:
 *         description: Version updated successfully
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
 *                         version:
 *                           $ref: '#/components/schemas/Version'
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Version not found
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
 * /api/v1/admin/versions/{versionId}:
 *   delete:
 *     summary: Delete a version
 *     description: Delete an existing version (admin only)
 *     tags: ["Versions - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: versionId
 *         in: path
 *         required: true
 *         description: Unique identifier of the version to delete
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Version deleted successfully
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
 *                   example: "Version deleted successfully"
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Version not found
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
