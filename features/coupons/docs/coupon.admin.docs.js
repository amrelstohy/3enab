/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Coupon ID
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         code:
 *           type: string
 *           description: Unique coupon code
 *           example: "SUMMER2024"
 *         type:
 *           type: string
 *           enum: [percentage, fixed]
 *           description: Discount type
 *           example: "percentage"
 *         value:
 *           type: number
 *           description: Discount value
 *           example: 20
 *         minOrderValue:
 *           type: number
 *           description: Minimum order value required to use this coupon
 *           example: 100
 *           default: 0
 *         maxDiscountValue:
 *           type: number
 *           description: Maximum discount amount (for percentage coupons)
 *           example: 50
 *           default: 0
 *         description:
 *           type: string
 *           description: Coupon description
 *           example: "Summer discount"
 *         startDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Coupon start date
 *         endDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Coupon end date
 *         isActive:
 *           type: boolean
 *           description: Whether the coupon is active
 *           example: true
 *         maxUsesPerUser:
 *           type: number
 *           description: Maximum uses per user
 *           example: 1
 *         maxUses:
 *           type: number
 *           description: Maximum total uses
 *           example: 100
 *         usedCount:
 *           type: number
 *           description: Number of times used
 *           example: 0
 *         allowedUser:
 *           type: string
 *           nullable: true
 *           description: Specific user ID (if coupon is user-specific)
 *           example: null
 *         vendors:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of vendor IDs (if coupon is vendor-specific)
 *           example: []
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Coupons - Admin
 *   description: Admin API endpoints for managing coupons
 */

/**
 * @swagger
 * /api/v1/admin/coupons:
 *   post:
 *     summary: Create a new coupon
 *     description: Admin-only endpoint to create a new coupon
 *     tags: ["Coupons - Admin"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - type
 *               - value
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SUMMER2024"
 *               type:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 example: "percentage"
 *               value:
 *                 type: number
 *                 example: 20
 *               minOrderValue:
 *                 type: number
 *                 example: 100
 *                 default: 0
 *               maxDiscountValue:
 *                 type: number
 *                 example: 50
 *                 default: 0
 *               description:
 *                 type: string
 *                 example: "Summer discount"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-31T23:59:59.999Z"
 *               maxUsesPerUser:
 *                 type: number
 *                 example: 1
 *               maxUses:
 *                 type: number
 *                 example: 100
 *               allowedUser:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               vendors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       201:
 *         description: Coupon created successfully
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
 *                   example: "Coupon created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupon:
 *                       $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Coupon code already exists
 *   get:
 *     summary: Get all coupons
 *     description: Admin-only endpoint to retrieve all coupons with pagination
 *     tags: ["Coupons - Admin"]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search by coupon code
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
 *         description: Coupons retrieved successfully
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
 *                   example: "Coupons fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupons:
 *                       type: object
 *                       properties:
 *                         coupons:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Coupon'
 *                         total:
 *                           type: number
 *                           example: 100
 *                         page:
 *                           type: number
 *                           example: 1
 *                         limit:
 *                           type: number
 *                           example: 10
 *                         totalPages:
 *                           type: number
 *                           example: 10
 */

/**
 * @swagger
 * /api/v1/admin/coupons/{couponId}:
 *   get:
 *     summary: Get coupon by ID
 *     description: Admin-only endpoint to retrieve a specific coupon
 *     tags: ["Coupons - Admin"]
 *     parameters:
 *       - name: couponId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *     responses:
 *       200:
 *         description: Coupon retrieved successfully
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
 *                   example: "Coupon fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupon:
 *                       $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *   put:
 *     summary: Update coupon
 *     description: Admin-only endpoint to update a coupon
 *     tags: ["Coupons - Admin"]
 *     parameters:
 *       - name: couponId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "AUTUMN2024"
 *               type:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 example: "percentage"
 *               value:
 *                 type: number
 *                 example: 15
 *               minOrderValue:
 *                 type: number
 *                 example: 150
 *               maxDiscountValue:
 *                 type: number
 *                 example: 75
 *               description:
 *                 type: string
 *                 example: "Autumn discount"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               maxUsesPerUser:
 *                 type: number
 *                 example: 2
 *               maxUses:
 *                 type: number
 *                 example: 200
 *               allowedUser:
 *                 type: string
 *                 nullable: true
 *               vendors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Coupon updated successfully
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
 *                   example: "Coupon updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupon:
 *                       $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Coupon not found
 *       409:
 *         description: Coupon code already exists
 *   delete:
 *     summary: Delete coupon
 *     description: Admin-only endpoint to delete a coupon
 *     tags: ["Coupons - Admin"]
 *     parameters:
 *       - name: couponId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
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
 *                   example: "Coupon deleted successfully"
 *       404:
 *         description: Coupon not found
 */

/**
 * @swagger
 * /api/v1/admin/coupons/{couponId}/active:
 *   patch:
 *     summary: Update coupon active status
 *     description: Admin-only endpoint to activate or deactivate a coupon
 *     tags: ["Coupons - Admin"]
 *     parameters:
 *       - name: couponId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
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
 *         description: Coupon active status updated successfully
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
 *                   example: "Coupon active status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupon:
 *                       $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *       409:
 *         description: Coupon active status is already set to this value
 */

module.exports = {};
