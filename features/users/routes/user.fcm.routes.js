/**
 * FCM Token Routes
 * Routes for managing Firebase Cloud Messaging tokens
 */

const express = require("express");
const router = express.Router();
const {
  registerFCMToken,
  removeFCMToken,
  getFCMTokenStatus,
} = require("../user.fcm.controller");
const auth = require("../../../middlewares/auth.middleware");

/**
 * @route   POST /api/users/fcm-token
 * @desc    Register or update FCM token for push notifications
 * @access  Private (All authenticated users)
 */
router.post("/", auth, registerFCMToken);

/**
 * @route   DELETE /api/users/fcm-token
 * @desc    Remove FCM token (on logout or disable notifications)
 * @access  Private (All authenticated users)
 */
router.delete("/", auth, removeFCMToken);

/**
 * @route   GET /api/users/fcm-token
 * @desc    Get FCM token status
 * @access  Private (All authenticated users)
 */
router.get("/", auth, getFCMTokenStatus);

module.exports = router;
