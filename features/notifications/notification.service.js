const {
  sendBroadcastNotification,
  sendNotificationToUsers,
} = require('../../utils/notificationService');

/**
 * Send broadcast notification to users
 * @param {Object} notificationData - Notification data
 * @param {String} notificationData.title - Notification title
 * @param {String} notificationData.body - Notification body
 * @param {String} notificationData.targetType - Target: 'all', 'user', 'vendor', 'delivery', 'admin'
 * @param {Object} notificationData.data - Additional data
 * @returns {Promise<Object>} - Result summary
 */
const sendBroadcast = async (notificationData) => {
  const { title, body, targetType = 'all', data = {} } = notificationData;

  const result = await sendBroadcastNotification(
    { title, body },
    data,
    targetType
  );

  return result;
};

/**
 * Send notification to specific users by their IDs
 * @param {Object} notificationData - Notification data
 * @param {String} notificationData.title - Notification title
 * @param {String} notificationData.body - Notification body
 * @param {Array<String>} notificationData.userIds - Array of user IDs to send notification to
 * @param {Object} notificationData.data - Additional data
 * @returns {Promise<Object>} - Result summary
 */
const sendToUsers = async (notificationData) => {
  const { title, body, userIds, data = {} } = notificationData;

  const result = await sendNotificationToUsers(
    userIds,
    { title, body },
    data
  );

  return result;
};

module.exports = {
  sendBroadcast,
  sendToUsers,
};
