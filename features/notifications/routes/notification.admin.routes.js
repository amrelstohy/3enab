const express = require('express');
const router = express.Router();
const notificationController = require('../notification.controller');

// Send broadcast notification to users
router.post('/broadcast', notificationController.sendBroadcast);

// Send notification to specific users by their IDs
router.post('/send-to-users', notificationController.sendToUsers);

module.exports = router;
