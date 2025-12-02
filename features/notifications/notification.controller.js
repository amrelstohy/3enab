const notificationService = require('./notification.service');

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

module.exports = {
  sendBroadcast,
};
