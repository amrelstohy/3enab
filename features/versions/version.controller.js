const versionService = require('./version.service');

// Create a new version
const createVersion = async (req, res) => {
  const version = await versionService.createVersion(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Version created successfully',
    data: { version },
  });
};

// Get the latest version
const getLatestVersion = async (req, res) => {
  const { appType, platform } = req.query;
  const version = await versionService.getLatestVersion(appType, platform);
  res.status(200).json({
    status: 'success',
    message: 'Latest version fetched successfully',
    data: { version },
  });
};

// Update a version
const updateVersion = async (req, res) => {
  const version = await versionService.updateVersion(req.version, req.body);
  res.status(200).json({
    status: 'success',
    message: 'Version updated successfully',
    data: { version },
  });
};

// Delete a version
const deleteVersion = async (req, res) => {
  await versionService.deleteVersion(req.version);
  res.status(200).json({
    status: 'success',
    message: 'Version deleted successfully',
  });
};

// Get all versions
const getAllVersions = async (req, res) => {
  const data = await versionService.getAllVersions(req.query);
  res.status(200).json({
    status: 'success',
    message: 'Versions fetched successfully',
    data,
  });
};

module.exports = {
  createVersion,
  getLatestVersion,
  updateVersion,
  deleteVersion,
  getAllVersions,
};
