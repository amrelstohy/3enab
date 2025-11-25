/**
 * FCM Token Controller
 * Handles registration and management of Firebase Cloud Messaging tokens
 */

const User = require("./user.model");
const { BadRequestError } = require("../../utils/errors");

/**
 * Register or update FCM token for user
 * @route POST /api/users/fcm-token
 * @access Private (All authenticated users)
 */
const registerFCMToken = async (req, res) => {
  const { fcmToken } = req.body;
  const userId = req.user._id;

  if (!fcmToken) {
    throw new BadRequestError("FCM token is required");
  }

  // Update user's FCM token
  const user = await User.findByIdAndUpdate(
    userId,
    { fcmToken },
    { new: true, select: "name email phone type fcmToken" }
  );

  if (!user) {
    throw new BadRequestError("User not found");
  }

  console.log(`✅ FCM token registered for user: ${userId}`);

  res.status(200).json({
    success: true,
    message: "FCM token registered successfully",
    data: {
      userId: user._id,
      fcmToken: user.fcmToken,
    },
  });
};

/**
 * Remove FCM token for user (on logout or disable notifications)
 * @route DELETE /api/users/fcm-token
 * @access Private (All authenticated users)
 */
const removeFCMToken = async (req, res) => {
  const userId = req.user._id;

  // Remove user's FCM token
  const user = await User.findByIdAndUpdate(
    userId,
    { fcmToken: null },
    { new: true, select: "name email phone type" }
  );

  if (!user) {
    throw new BadRequestError("User not found");
  }

  console.log(`🗑️ FCM token removed for user: ${userId}`);

  res.status(200).json({
    success: true,
    message: "FCM token removed successfully",
    data: {
      userId: user._id,
    },
  });
};

/**
 * Get FCM token status for user
 * @route GET /api/users/fcm-token
 * @access Private (All authenticated users)
 */
const getFCMTokenStatus = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("fcmToken").lean();

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json({
    success: true,
    data: {
      userId: userId,
      hasToken: !!user.fcmToken,
      tokenPreview: user.fcmToken
        ? `${user.fcmToken.substring(0, 20)}...`
        : null,
    },
  });
};

module.exports = {
  registerFCMToken,
  removeFCMToken,
  getFCMTokenStatus,
};
