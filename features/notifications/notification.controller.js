const notificationService = require('./notification.service');
const { BadRequestError } = require('../../utils/errors');

/**
 * Send broadcast notification to users
 */
const sendBroadcast = async (req, res) => {
  const { title, body, targetType, data } = req.body;

  const result = await notificationService.sendBroadcast({
    title,
    body,
    targetType,
    data,
  });

  res.status(200).json({
    status: 'success',
    message: `Notification sent to ${result.success} users successfully`,
    data: {
      success: result.success,
      failed: result.failed,
      totalTargeted: result.totalTargeted,
    },
  });
};

/**
 * Send notification to specific users by their IDs
 */
const sendToUsers = async (req, res) => {
  const { title, body, userIds, data } = req.body;

  if (!title || !body) {
    throw new BadRequestError('Title and body are required');
  }

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    throw new BadRequestError('userIds must be a non-empty array');
  }

  const result = await notificationService.sendToUsers({
    title,
    body,
    userIds,
    data,
  });

  res.status(200).json({
    status: 'success',
    message: `Notification sent successfully`,
    data: {
      success: result.success,
      failed: result.failed,
      totalTargeted: userIds.length,
    },
  });
};

module.exports = {
  sendBroadcast,
  sendToUsers,
};
