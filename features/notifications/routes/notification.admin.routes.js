const express = require('express');
const router = express.Router();
const notificationController = require('../notification.controller');

// Send broadcast notification to users
router.post('/broadcast', notificationController.sendBroadcast);

module.exports = router;
