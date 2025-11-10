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
 *         maxDiscountValue:
 *           type: number
 *           description: Maximum discount amount (for percentage coupons)
 *           example: 50
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * tags:
 *   name: Coupons - User
 *   description: User API endpoints for viewing available coupons
 */

/**
 * @swagger
 * /api/v1/coupons:
 *   get:
 *     summary: Get available coupons
 *     description: User endpoint to retrieve all available and active coupons
 *     tags: ["Coupons - User"]
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
 *                           example: 10
 *                         page:
 *                           type: number
 *                           example: 1
 *                         limit:
 *                           type: number
 *                           example: 10
 *                         totalPages:
 *                           type: number
 *                           example: 1
 *       401:
 *         description: Unauthorized
 */

module.exports = {};
