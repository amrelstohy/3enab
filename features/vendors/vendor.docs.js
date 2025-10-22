/**
 * @swagger
 * components:
 *   schemas:
 *     WorkingHours:
 *       type: object
 *       properties:
 *         open:
 *           type: string
 *           description: Opening time in HH:MM format
 *           example: "09:00"
 *         close:
 *           type: string
 *           description: Closing time in HH:MM format
 *           example: "21:00"
 *         days:
 *           type: array
 *           items:
 *             type: string
 *           description: Working days of the week
 *           example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 *     Vendor:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the vendor
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Name of the vendor
 *           example: "Pizza Palace"
 *         description:
 *           type: string
 *           description: Description of the vendor
 *           example: "Best pizza in town with fresh ingredients"
 *         logoPath:
 *           type: string
 *           nullable: true
 *           description: Path to the vendor logo
 *           example: "/uploads/vendorsLogos/507f1f77bcf86cd799439011.jpg"
 *         category:
 *           type: string
 *           description: Vendor category ID
 *           example: "507f1f77bcf86cd799439012"
 *         workingHours:
 *           type: object
 *           description: Vendor working hours
 *           $ref: '#/components/schemas/WorkingHours'
 *         isActive:
 *           type: boolean
 *           description: Whether the vendor is active
 *           example: true
 *         owner:
 *           type: string
 *           description: Owner user ID
 *           example: "507f1f77bcf86cd799439013"
 *         averageRate:
 *           type: number
 *           description: Average rating of the vendor
 *           example: 4.5
 *         totalRates:
 *           type: number
 *           description: Total number of ratings
 *           example: 150
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the vendor was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the vendor was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "Pizza Palace"
 *         description: "Best pizza in town with fresh ingredients"
 *         logoPath: "/uploads/vendorsLogos/507f1f77bcf86cd799439011.jpg"
 *         category: "507f1f77bcf86cd799439012"
 *         workingHours:
 *           open: "09:00"
 *           close: "21:00"
 *           days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 *         isActive: true
 *         owner: "507f1f77bcf86cd799439013"
 *         averageRate: 4.5
 *         totalRates: 150
 *         createdAt: "2024-01-01T00:00:00.000Z"
 *         updatedAt: "2024-01-01T00:00:00.000Z"
 *     CreateVendorRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the vendor
 *           example: "Pizza Palace"
 *         description:
 *           type: string
 *           description: Description of the vendor
 *           example: "Best pizza in town with fresh ingredients"
 *         categoryId:
 *           type: string
 *           description: Vendor category ID
 *           example: "507f1f77bcf86cd799439012"
 *         openHour:
 *           type: string
 *           description: Opening time in HH:MM format
 *           example: "09:00"
 *         closeHour:
 *           type: string
 *           description: Closing time in HH:MM format
 *           example: "21:00"
 *         days:
 *           type: array
 *           items:
 *             type: string
 *           description: Working days of the week
 *           example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 *     UpdateVendorRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Updated name of the vendor
 *           example: "Updated Pizza Palace"
 *         description:
 *           type: string
 *           description: Updated description of the vendor
 *           example: "Updated description"
 *         categoryId:
 *           type: string
 *           description: Updated vendor category ID
 *           example: "507f1f77bcf86cd799439012"
 *         openHour:
 *           type: string
 *           description: Updated opening time in HH:MM format
 *           example: "08:00"
 *         closeHour:
 *           type: string
 *           description: Updated closing time in HH:MM format
 *           example: "22:00"
 *         days:
 *           type: array
 *           items:
 *             type: string
 *           description: Updated working days of the week
 *           example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
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
 *   name: Vendors
 *   description: API endpoints for managing vendors
 */

/**
 * @swagger
 * /api/v1/vendors:
 *   post:
 *     summary: Create a new vendor
 *     description: Create a new vendor (requires authentication)
 *     tags: [Vendors]
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
 *             $ref: '#/components/schemas/CreateVendorRequest'
 *           examples:
 *             restaurant_vendor:
 *               summary: Restaurant vendor
 *               value:
 *                 name: "Pizza Palace"
 *                 description: "Best pizza in town with fresh ingredients"
 *                 categoryId: "507f1f77bcf86cd799439012"
 *                 openHour: "09:00"
 *                 closeHour: "21:00"
 *                 days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 *     responses:
 *       201:
 *         description: Vendor created successfully
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
 *                         vendor:
 *                           $ref: '#/components/schemas/Vendor'
 *       401:
 *         description: Unauthorized
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
 * /api/v1/vendors:
 *   get:
 *     summary: Get all vendors
 *     description: Retrieve all active vendors with optional filtering and pagination
 *     tags: [Vendors]
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         required: false
 *         description: Filter by vendor category ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439012"
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search vendors by name
 *         schema:
 *           type: string
 *           example: "pizza"
 *       - name: orderBy
 *         in: query
 *         required: false
 *         description: Field to order by
 *         schema:
 *           type: string
 *           enum: [createdAt, name, averageRate]
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
 *         description: Vendors retrieved successfully
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
 *                         vendors:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Vendor'
 *                         total:
 *                           type: integer
 *                           description: Total number of vendors
 *                         page:
 *                           type: integer
 *                           description: Current page number
 *                         limit:
 *                           type: integer
 *                           description: Number of items per page
 *                         totalPages:
 *                           type: integer
 *                           description: Total number of pages
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}:
 *   get:
 *     summary: Get vendor by ID
 *     description: Retrieve a specific vendor by ID
 *     tags: [Vendors]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Vendor retrieved successfully
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
 *                         vendor:
 *                           $ref: '#/components/schemas/Vendor'
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
 * /api/v1/vendors/{vendorId}:
 *   put:
 *     summary: Update vendor
 *     description: Update vendor details (requires authentication and ownership)
 *     tags: [Vendors]
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
 *         description: Unique identifier of the vendor to update
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVendorRequest'
 *           examples:
 *             update_vendor:
 *               summary: Update vendor details
 *               value:
 *                 name: "Updated Pizza Palace"
 *                 description: "Updated description"
 *                 categoryId: "507f1f77bcf86cd799439012"
 *                 openHour: "08:00"
 *                 closeHour: "22:00"
 *                 days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
 *     responses:
 *       200:
 *         description: Vendor updated successfully
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
 *                         vendor:
 *                           $ref: '#/components/schemas/Vendor'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Not the owner
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}:
 *   delete:
 *     summary: Delete vendor
 *     description: Delete a vendor (requires authentication and ownership)
 *     tags: [Vendors]
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
 *         description: Unique identifier of the vendor to delete
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
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
 *                   example: "Vendor deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Not the owner
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/logo:
 *   post:
 *     summary: Upload vendor logo
 *     description: Upload a logo for the vendor (requires authentication and ownership)
 *     tags: [Vendors]
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
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo image file (JPG, PNG, WEBP)
 *     responses:
 *       200:
 *         description: Logo uploaded successfully
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
 *                         vendor:
 *                           $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Bad request - Invalid file format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Not the owner
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/logo:
 *   get:
 *     summary: Get vendor logo
 *     description: Retrieve the vendor logo image
 *     tags: [Vendors]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Logo retrieved successfully
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Logo not found
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
 * /api/v1/vendors/{vendorId}/activate:
 *   patch:
 *     summary: Activate vendor
 *     description: Activate a vendor (requires authentication and ownership)
 *     tags: [Vendors]
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
 *         description: Unique identifier of the vendor to activate
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Vendor activated successfully
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
 *                         vendor:
 *                           $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Bad request - Vendor is already active
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Not the owner
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/vendors/{vendorId}/deactivate:
 *   patch:
 *     summary: Deactivate vendor
 *     description: Deactivate a vendor (requires authentication and ownership)
 *     tags: [Vendors]
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
 *         description: Unique identifier of the vendor to deactivate
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Vendor deactivated successfully
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
 *                         vendor:
 *                           $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Bad request - Vendor is already inactive
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Not the owner
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
