/**
 * Notification Service
 * Handles push notifications via Firebase Cloud Messaging (FCM)
 */

const { getMessaging } = require('../config/firebase');
const User = require('../features/users/user.model');

/**
 * Send notification to a single user (to all their registered devices)
 * @param {String} userId - User ID
 * @param {Object} notification - Notification data
 * @param {String} notification.title - Notification title
 * @param {String} notification.body - Notification body
 * @param {Object} data - Additional data to send with notification
 * @returns {Promise<Object>} - FCM response
 */
const sendNotificationToUser = async (userId, notification, data = {}) => {
  try {
    // Get user's FCM tokens
    const user = await User.findById(userId).select('fcmTokens').lean();

    if (!user || !user.fcmTokens || user.fcmTokens.length === 0) {
      console.log(`⚠️ No FCM tokens found for user: ${userId}`);
      return { success: false, reason: 'No FCM tokens' };
    }

    const tokens = user.fcmTokens;

    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: {
        ...data,
        userId: userId.toString(),
        timestamp: new Date().toISOString(),
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: '3enab_orders',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      tokens,
    };

    const messaging = getMessaging();
    const response = await messaging.sendEachForMulticast(message);

    console.log(
      `✅ Notification sent to user ${userId}: ${response.successCount} success, ${response.failureCount} failed`
    );

    // Remove invalid tokens
    if (response.failureCount > 0) {
      const invalidTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const error = resp.error;
          if (
            error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered'
          ) {
            invalidTokens.push(tokens[idx]);
          }
        }
      });

      if (invalidTokens.length > 0) {
        await User.findByIdAndUpdate(userId, {
          $pull: { fcmTokens: { $in: invalidTokens } },
        });
        console.log(
          `🗑️ Removed ${invalidTokens.length} invalid FCM tokens for user: ${userId}`
        );
      }
    }

    return {
      success: response.successCount > 0,
      successCount: response.successCount,
      failureCount: response.failureCount,
    };
  } catch (error) {
    console.error(`❌ Failed to send notification to user ${userId}:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Send notification to multiple users by their IDs
 * @param {Array<String>} userIds - Array of user IDs
 * @param {Object} notification - Notification data
 * @param {Object} data - Additional data
 * @returns {Promise<Object>} - Summary of results
 */
const sendNotificationToUsers = async (userIds, notification, data = {}) => {
  try {
    // Get all users with FCM tokens
    const users = await User.find({
      _id: { $in: userIds },
      fcmTokens: { $exists: true, $not: { $size: 0 } },
    })
      .select('_id fcmTokens')
      .lean();

    if (users.length === 0) {
      console.log('⚠️ No users with FCM tokens found');
      return { success: 0, failed: 0 };
    }

    // Flatten all tokens and track which user each token belongs to
    const tokenUserMap = new Map(); // token -> userId
    const allTokens = [];
    users.forEach((user) => {
      user.fcmTokens.forEach((token) => {
        allTokens.push(token);
        tokenUserMap.set(token, user._id.toString());
      });
    });

    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: {
        ...data,
        timestamp: new Date().toISOString(),
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: '3enab_orders',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      tokens: allTokens,
    };

    const messaging = getMessaging();
    const response = await messaging.sendEachForMulticast(message);

    console.log(
      `✅ Sent notifications: ${response.successCount} success, ${response.failureCount} failed`
    );

    // Remove invalid tokens
    if (response.failureCount > 0) {
      const invalidTokensByUser = new Map(); // userId -> [invalidTokens]
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const error = resp.error;
          if (
            error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered'
          ) {
            const token = allTokens[idx];
            const userId = tokenUserMap.get(token);
            if (!invalidTokensByUser.has(userId)) {
              invalidTokensByUser.set(userId, []);
            }
            invalidTokensByUser.get(userId).push(token);
          }
        }
      });

      // Remove invalid tokens for each user
      for (const [userId, tokens] of invalidTokensByUser) {
        await User.findByIdAndUpdate(userId, {
          $pull: { fcmTokens: { $in: tokens } },
        });
      }
      const totalRemoved = Array.from(invalidTokensByUser.values()).reduce(
        (sum, arr) => sum + arr.length,
        0
      );
      if (totalRemoved > 0) {
        console.log(`🗑️ Removed ${totalRemoved} invalid FCM tokens`);
      }
    }

    return {
      success: response.successCount,
      failed: response.failureCount,
    };
  } catch (error) {
    console.error('❌ Failed to send notifications to users:', error);
    return { success: 0, failed: userIds.length, error: error.message };
  }
};

/**
 * Send notification to all users of a specific type
 * @param {String} userType - User type (vendor, delivery, user, admin)
 * @param {Object} notification - Notification data
 * @param {Object} data - Additional data
 * @returns {Promise<Object>} - Summary of results
 */
const sendNotificationToUserType = async (
  userType,
  notification,
  data = {}
) => {
  try {
    const users = await User.find({
      type: userType,
      fcmTokens: { $exists: true, $not: { $size: 0 } },
    })
      .select('_id')
      .lean();

    if (users.length === 0) {
      console.log(`⚠️ No ${userType} users with FCM tokens found`);
      return { success: 0, failed: 0 };
    }

    const userIds = users.map((user) => user._id.toString());
    return await sendNotificationToUsers(userIds, notification, {
      ...data,
      userType,
    });
  } catch (error) {
    console.error(
      `❌ Failed to send notifications to ${userType} users:`,
      error
    );
    return { success: 0, failed: 0, error: error.message };
  }
};

/**
 * Send notification to vendor owner
 * @param {String} vendorId - Vendor ID
 * @param {Object} notification - Notification data
 * @param {Object} data - Additional data
 * @returns {Promise<Object>} - FCM response
 */
const sendNotificationToVendor = async (vendorId, notification, data = {}) => {
  try {
    const Vendor = require('../features/vendors/vendor.model');
    const vendor = await Vendor.findById(vendorId).select('owner').lean();

    if (!vendor) {
      console.log(`⚠️ Vendor not found: ${vendorId}`);
      return { success: false, reason: 'Vendor not found' };
    }

    return await sendNotificationToUser(vendor.owner.toString(), notification, {
      ...data,
      vendorId: vendorId.toString(),
    });
  } catch (error) {
    console.error(
      `❌ Failed to send notification to vendor ${vendorId}:`,
      error
    );
    return { success: false, error: error.message };
  }
};

/**
 * Send notification to all delivery users
 * @param {Object} notification - Notification data
 * @param {Object} data - Additional data
 * @returns {Promise<Object>} - Summary of results
 */
const sendNotificationToAllDelivery = async (notification, data = {}) => {
  return await sendNotificationToUserType('delivery', notification, data);
};

/**
 * Send notification to specific delivery driver
 * @param {String} driverId - Driver user ID
 * @param {Object} notification - Notification data
 * @param {Object} data - Additional data
 * @returns {Promise<Object>} - FCM response
 */
const sendNotificationToDriver = async (driverId, notification, data = {}) => {
  return await sendNotificationToUser(driverId, notification, {
    ...data,
    role: 'driver',
  });
};

/**
 * Send broadcast notification to all users
 * @param {Object} notification - Notification data
 * @param {String} notification.title - Notification title
 * @param {String} notification.body - Notification body
 * @param {Object} data - Additional data to send with notification
 * @param {String} targetType - Target user type: 'all', 'user', 'vendor', 'delivery', 'admin'
 * @returns {Promise<Object>} - Summary of results
 */
const sendBroadcastNotification = async (
  notification,
  data = {},
  targetType = 'all'
) => {
  try {
    let query = { fcmTokens: { $exists: true, $not: { $size: 0 } } };

    // Filter by user type if specified
    if (targetType !== 'all') {
      query.type = targetType;
    }

    const users = await User.find(query).select('_id fcmTokens').lean();

    if (users.length === 0) {
      console.log(
        `⚠️ No users with FCM tokens found for target: ${targetType}`
      );
      return { success: 0, failed: 0, totalTargeted: 0 };
    }

    // Flatten all tokens and track which user each token belongs to
    const tokenUserMap = new Map(); // token -> userId
    const allTokens = [];
    users.forEach((user) => {
      user.fcmTokens.forEach((token) => {
        allTokens.push(token);
        tokenUserMap.set(token, user._id.toString());
      });
    });

    // FCM allows max 500 tokens per multicast
    const batchSize = 500;
    let totalSuccess = 0;
    let totalFailed = 0;
    const invalidTokensByUser = new Map(); // userId -> [invalidTokens]

    for (let i = 0; i < allTokens.length; i += batchSize) {
      const batchTokens = allTokens.slice(i, i + batchSize);

      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data: {
          ...data,
          type: 'broadcast',
          targetType,
          timestamp: new Date().toISOString(),
        },
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channelId: '3enab_promotions',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
            },
          },
        },
        tokens: batchTokens,
      };

      const messaging = getMessaging();
      const response = await messaging.sendEachForMulticast(message);

      totalSuccess += response.successCount;
      totalFailed += response.failureCount;

      // Collect invalid tokens by user
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const error = resp.error;
          if (
            error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered'
          ) {
            const token = batchTokens[idx];
            const userId = tokenUserMap.get(token);
            if (!invalidTokensByUser.has(userId)) {
              invalidTokensByUser.set(userId, []);
            }
            invalidTokensByUser.get(userId).push(token);
          }
        }
      });
    }

    // Remove invalid tokens for each user
    for (const [userId, tokens] of invalidTokensByUser) {
      await User.findByIdAndUpdate(userId, {
        $pull: { fcmTokens: { $in: tokens } },
      });
    }
    const totalRemoved = Array.from(invalidTokensByUser.values()).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
    if (totalRemoved > 0) {
      console.log(`🗑️ Removed ${totalRemoved} invalid FCM tokens`);
    }

    console.log(
      `✅ Broadcast sent: ${totalSuccess} success, ${totalFailed} failed out of ${allTokens.length} tokens (${users.length} users)`
    );

    return {
      success: totalSuccess,
      failed: totalFailed,
      totalTargeted: users.length,
      totalTokens: allTokens.length,
    };
  } catch (error) {
    console.error('❌ Failed to send broadcast notification:', error);
    return { success: 0, failed: 0, error: error.message };
  }
};

module.exports = {
  sendNotificationToUser,
  sendNotificationToUsers,
  sendNotificationToUserType,
  sendNotificationToVendor,
  sendNotificationToAllDelivery,
  sendNotificationToDriver,
  sendBroadcastNotification,
};
