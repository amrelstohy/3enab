/**
 * @swagger
 * components:
 *   schemas:
 *     VendorCategory:
 *       type: object
 *       required:
 *         - name
 *         - description
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
 *           description: Date when the vendor category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the vendor category was last updated
 *     CreateVendorCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Vendor category name
 *           example: "Restaurants"
 *         description:
 *           type: string
 *           description: Vendor category description
 *           example: "All restaurant vendors"
 *     UpdateVendorCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Updated vendor category name
 *           example: "Fast Food Restaurants"
 *         description:
 *           type: string
 *           description: Updated vendor category description
 *           example: "Fast food restaurant vendors only"
 *     UpdateVendorCategoryStatusRequest:
 *       type: object
 *       required:
 *         - isActive
 *       properties:
 *         isActive:
 *           type: boolean
 *           description: New status for the vendor category
 *           example: true
 *     UpdateVendorCategoryOrderRequest:
 *       type: object
 *       required:
 *         - orderedArray
 *       properties:
 *         orderedArray:
 *           type: array
 *           description: Array of vendor category IDs in the desired order
 *           items:
 *             type: string
 *           example: ["64f1a2b3c4d5e6f7890a1111","64f1a2b3c4d5e6f7890a2222"]
 * tags:
 *   name: Vendor Categories - Admin
 *   description: Admin API endpoints for managing vendor categories
 */

/**
 * @swagger
 * /api/v1/admin/vendorCategories:
 *   post:
 *     summary: Create a new vendor category
 *     description: Admin-only endpoint to create a new vendor category
 *     tags: ["Vendor Categories - Admin"]
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
 *             $ref: '#/components/schemas/CreateVendorCategoryRequest'
 *           examples:
 *             restaurant_category:
 *               summary: Restaurant category
 *               value:
 *                 name: "Restaurants"
 *                 description: "All restaurant vendors"
 *             retail_category:
 *               summary: Retail category
 *               value:
 *                 name: "Retail Stores"
 *                 description: "All retail store vendors"
 *     responses:
 *       201:
 *         description: Vendor category created successfully
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
 *                   example: "Vendor category created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategory:
 *                       $ref: '#/components/schemas/VendorCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all vendor categories
 *     description: Admin endpoint to retrieve all vendor categories (including inactive)
 *     tags: ["Vendor Categories - Admin"]
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
 * /api/v1/admin/vendorCategories/{vendorCategoryId}:
 *   get:
 *     summary: Get a vendor category by ID
 *     description: Admin endpoint to fetch a single vendor category
 *     tags: ["Vendor Categories - Admin"]
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
 *   put:
 *     summary: Update a vendor category
 *     description: Admin-only endpoint to update vendor category details
 *     tags: ["Vendor Categories - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: vendorCategoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor category to update
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVendorCategoryRequest'
 *           examples:
 *             update_category:
 *               summary: Update vendor category
 *               value:
 *                 name: "Fast Food Restaurants"
 *                 description: "Fast food restaurant vendors only"
 *     responses:
 *       200:
 *         description: Vendor category updated successfully
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
 *                   example: "Vendor category updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategory:
 *                       $ref: '#/components/schemas/VendorCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Vendor category not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a vendor category
 *     description: Admin-only endpoint to delete a vendor category
 *     tags: ["Vendor Categories - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: vendorCategoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor category to delete
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     responses:
 *       200:
 *         description: Vendor category deleted successfully
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
 *                   example: "Vendor category deleted successfully"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Vendor category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/vendorCategories/{vendorCategoryId}/image:
 *   post:
 *     summary: Upload vendor category image
 *     description: Admin-only endpoint to upload an image for a vendor category
 *     tags: ["Vendor Categories - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: vendorCategoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor category
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
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
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vendor category image uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategory:
 *                       $ref: '#/components/schemas/VendorCategory'
 *       400:
 *         description: Bad request - Invalid file format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Vendor category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/vendorCategories/{vendorCategoryId}/active:
 *   patch:
 *     summary: Update vendor category active status
 *     description: Admin-only endpoint to update the active status of a vendor category
 *     tags: ["Vendor Categories - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: vendorCategoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor category to update
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
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
 *                 description: Vendor category active status
 *                 example: true
 *     responses:
 *       200:
 *         description: Vendor category active status updated successfully
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
 *                   example: "Vendor category active status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategory:
 *                       $ref: '#/components/schemas/VendorCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Vendor category not found
 *       409:
 *         description: Conflict - Vendor category active status is already set to this value
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/vendorCategories/{vendorCategoryId}/update-order:
 *   patch:
 *     summary: Update vendor categories order
 *     description: Admin-only endpoint to reorder vendor categories
 *     tags: ["Vendor Categories - Admin"]
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: JWT access token
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - name: vendorCategoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the vendor category
 *         schema:
 *           type: string
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVendorCategoryOrderRequest'
 *           examples:
 *             update_order:
 *               summary: Update vendor categories order
 *               value:
 *                 orderedArray: ["64f1a2b3c4d5e6f7890a1111", "64f1a2b3c4d5e6f7890a2222", "64f1a2b3c4d5e6f7890a3333"]
 *     responses:
 *       200:
 *         description: Vendor category order updated successfully
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
 *                   example: "Vendor category order updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendorCategories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VendorCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Missing vendor categories
 *       500:
 *         description: Internal server error
 */
