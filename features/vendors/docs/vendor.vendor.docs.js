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
 *   name: Vendors - Vendor
 *   description: Vendor API endpoints for managing their own vendor profile
 */

/**
 * @swagger
 * /api/v1/vendor/vendors:
 *   get:
 *     summary: Get my vendors
 *     description: Retrieve all vendors owned by the authenticated user
 *     tags: ["Vendors - Vendor"]
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
 *                   example: "vendors fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Vendor'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new vendor
 *     description: Create a vendor profile (Vendor only)
 *     tags: ["Vendors - Vendor"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pizza Palace"
 *               description:
 *                 type: string
 *                 example: "Best pizza in town"
 *               categoryId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439013"
 *               openHour:
 *                 type: string
 *                 example: "09:00"
 *                 default: "09:00"
 *               closeHour:
 *                 type: string
 *                 example: "21:00"
 *                 default: "21:00"
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 *     responses:
 *       201:
 *         description: Vendor created successfully
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
 *                   example: "Vendor created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}:
 *   put:
 *     summary: Update vendor
 *     description: Update vendor profile (Owner only)
 *     tags: ["Vendors - Vendor"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pizza Palace Updated"
 *               description:
 *                 type: string
 *                 example: "Still the best pizza in town"
 *               categoryId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439013"
 *               openHour:
 *                 type: string
 *                 example: "10:00"
 *               closeHour:
 *                 type: string
 *                 example: "22:00"
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
 *     responses:
 *       200:
 *         description: Vendor updated successfully
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
 *                   example: "Vendor updated successfully"
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
 *   delete:
 *     summary: Delete vendor
 *     description: Delete vendor profile (Owner only)
 *     tags: ["Vendors - Vendor"]
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
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}/logo:
 *   post:
 *     summary: Upload vendor logo
 *     description: Upload logo for vendor (Owner only)
 *     tags: ["Vendors - Vendor"]
 *     parameters:
 *       - name: vendorId
 *         in: path
 *         required: true
 *         description: Vendor ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo uploaded successfully
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
 *                   example: "Logo uploaded successfully"
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
 *   get:
 *     summary: Get vendor logo
 *     description: Retrieve vendor logo image
 *     tags: ["Vendors - Vendor"]
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

/**
 * @swagger
 * /api/v1/vendor/vendors/{vendorId}/active:
 *   patch:
 *     summary: Update vendor active status
 *     description: Activate or deactivate vendor (Owner only)
 *     tags: ["Vendors - Vendor"]
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
