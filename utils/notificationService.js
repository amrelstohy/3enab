/**
 * Notification Service
 * Handles push notifications via Firebase Cloud Messaging (FCM)
 */

const { getMessaging } = require('../config/firebase');
const User = require('../features/users/user.model');

/**
 * Send notification to a single user
 * @param {String} userId - User ID
 * @param {Object} notification - Notification data
 * @param {String} notification.title - Notification title
 * @param {String} notification.body - Notification body
 * @param {Object} data - Additional data to send with notification
 * @returns {Promise<Object>} - FCM response
 */
const sendNotificationToUser = async (userId, notification, data = {}) => {
  try {
    // Get user's FCM token
    const user = await User.findById(userId).select('fcmToken').lean();

    if (!user || !user.fcmToken) {
      console.log(`⚠️ No FCM token found for user: ${userId}`);
      return { success: false, reason: 'No FCM token' };
    }

    const message = {
      token: user.fcmToken,
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
    };

    const messaging = getMessaging();
    const response = await messaging.send(message);

    console.log(`✅ Notification sent to user ${userId}:`, response);
    return { success: true, response };
  } catch (error) {
    console.error(`❌ Failed to send notification to user ${userId}:`, error);

    // If token is invalid or expired, remove it from user
    if (
      error.code === 'messaging/invalid-registration-token' ||
      error.code === 'messaging/registration-token-not-registered'
    ) {
      await User.findByIdAndUpdate(userId, { fcmToken: null });
      console.log(`🗑️ Removed invalid FCM token for user: ${userId}`);
    }

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
      fcmToken: { $ne: null },
    })
      .select('fcmToken')
      .lean();

    if (users.length === 0) {
      console.log('⚠️ No users with FCM tokens found');
      return { success: 0, failed: 0 };
    }

    const tokens = users.map((user) => user.fcmToken);

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
      tokens,
    };

    const messaging = getMessaging();
    const response = await messaging.sendEachForMulticast(message);

    console.log(
      `✅ Sent notifications: ${response.successCount} success, ${response.failureCount} failed`
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
        await User.updateMany(
          { fcmToken: { $in: invalidTokens } },
          { fcmToken: null }
        );
        console.log(`🗑️ Removed ${invalidTokens.length} invalid FCM tokens`);
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
      fcmToken: { $ne: null },
    })
      .select('fcmToken')
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
    let query = { fcmToken: { $ne: null } };

    // Filter by user type if specified
    if (targetType !== 'all') {
      query.type = targetType;
    }

    const users = await User.find(query).select('fcmToken').lean();

    if (users.length === 0) {
      console.log(
        `⚠️ No users with FCM tokens found for target: ${targetType}`
      );
      return { success: 0, failed: 0, totalTargeted: 0 };
    }

    const tokens = users.map((user) => user.fcmToken);

    // FCM allows max 500 tokens per multicast
    const batchSize = 500;
    let totalSuccess = 0;
    let totalFailed = 0;
    const invalidTokens = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
      const batchTokens = tokens.slice(i, i + batchSize);

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

      // Collect invalid tokens
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const error = resp.error;
          if (
            error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered'
          ) {
            invalidTokens.push(batchTokens[idx]);
          }
        }
      });
    }

    // Remove invalid tokens
    if (invalidTokens.length > 0) {
      await User.updateMany(
        { fcmToken: { $in: invalidTokens } },
        { fcmToken: null }
      );
      console.log(`🗑️ Removed ${invalidTokens.length} invalid FCM tokens`);
    }

    console.log(
      `✅ Broadcast sent: ${totalSuccess} success, ${totalFailed} failed out of ${users.length} users`
    );

    return {
      success: totalSuccess,
      failed: totalFailed,
      totalTargeted: users.length,
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
