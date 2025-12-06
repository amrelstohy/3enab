const express = require('express');
const router = express.Router();
const versionController = require('../version.controller');

// Get latest version (uses req.appType from app)
router.get('/latest', versionController.getLatestVersionForApp);

module.exports = router;
