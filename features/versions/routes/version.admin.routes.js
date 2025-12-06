const express = require('express');
const router = express.Router();
const versionController = require('../version.controller');
const isResourceExists = require('../../../middlewares/isResourceExists');
const Version = require('../version.model');

// Routes
router.post('', versionController.createVersion);
router.get('/latest', versionController.getLatestVersion);
router.get('', versionController.getAllVersions);
router.put(
  '/:versionId',
  isResourceExists(Version, 'versionId'),
  versionController.updateVersion
);
router.delete(
  '/:versionId',
  isResourceExists(Version, 'versionId'),
  versionController.deleteVersion
);

module.exports = router;
