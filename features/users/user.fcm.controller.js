/**
 * FCM Token Controller
 * Handles registration and management of Firebase Cloud Messaging tokens
 */

const User = require("./user.model");
const { BadRequestError } = require("../../utils/errors");

/**
 * Register or update FCM token for user
 * Adds token to array if not exists, keeps max 10 tokens (removes oldest if full)
 * @route POST /api/users/fcm-token
 * @access Private (All authenticated users)
 */
const registerFCMToken = async (req, res) => {
  const { fcmToken } = req.body;
  const userId = req.user._id;

  if (!fcmToken) {
    throw new BadRequestError("FCM token is required");
  }

  // Get current user
  const user = await User.findById(userId).select("name email phone type fcmTokens");

  if (!user) {
    throw new BadRequestError("User not found");
  }

  // Check if token already exists
  if (user.fcmTokens.includes(fcmToken)) {
    console.log(`ℹ️ FCM token already exists for user: ${userId}`);
    return res.status(200).json({
      success: true,
      message: "FCM token already registered",
      data: {
        userId: user._id,
        fcmTokens: user.fcmTokens,
        tokenCount: user.fcmTokens.length,
      },
    });
  }

  // Add new token, remove oldest if we have 10 already
  if (user.fcmTokens.length >= 10) {
    user.fcmTokens.shift(); // Remove oldest token
  }
  user.fcmTokens.push(fcmToken);

  await user.save();

  console.log(`✅ FCM token registered for user: ${userId} (Total: ${user.fcmTokens.length})`);

  res.status(200).json({
    success: true,
    message: "FCM token registered successfully",
    data: {
      userId: user._id,
      fcmTokens: user.fcmTokens,
      tokenCount: user.fcmTokens.length,
    },
  });
};

/**
 * Remove FCM token for user (on logout or disable notifications)
 * If fcmToken is provided in body, removes only that token
 * If no fcmToken provided, removes all tokens
 * @route DELETE /api/users/fcm-token
 * @access Private (All authenticated users)
 */
const removeFCMToken = async (req, res) => {
  const userId = req.user._id;
  const { fcmToken } = req.body;

  let user;
  let message;

  if (fcmToken) {
    // Remove specific token from array
    user = await User.findByIdAndUpdate(
      userId,
      { $pull: { fcmTokens: fcmToken } },
      { new: true, select: "name email phone type fcmTokens" }
    );
    message = "FCM token removed successfully";
  } else {
    // Remove all tokens
    user = await User.findByIdAndUpdate(
      userId,
      { fcmTokens: [] },
      { new: true, select: "name email phone type fcmTokens" }
    );
    message = "All FCM tokens removed successfully";
  }

  if (!user) {
    throw new BadRequestError("User not found");
  }

  console.log(`🗑️ FCM token(s) removed for user: ${userId}`);

  res.status(200).json({
    success: true,
    message,
    data: {
      userId: user._id,
      remainingTokens: user.fcmTokens.length,
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

  const user = await User.findById(userId).select("fcmTokens").lean();

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json({
    success: true,
    data: {
      userId: userId,
      hasTokens: user.fcmTokens && user.fcmTokens.length > 0,
      tokenCount: user.fcmTokens ? user.fcmTokens.length : 0,
      tokenPreviews: user.fcmTokens
        ? user.fcmTokens.map((token) => `${token.substring(0, 20)}...`)
        : [],
    },
  });
};

module.exports = {
  registerFCMToken,
  removeFCMToken,
  getFCMTokenStatus,
};
