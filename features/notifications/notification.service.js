const {
  sendBroadcastNotification,
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

module.exports = {
  sendBroadcast,
};
