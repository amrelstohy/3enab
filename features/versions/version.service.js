const Version = require('./version.model');
const { NotFoundError } = require('../../utils/errors');

// Create a new version
const createVersion = async (versionData) => {
  const { appType, platform, version, mandatory } = versionData;

  // Get the last mandatory version for same appType and platform to set as minVersion
  let minVersion = version; // Default to current version if no mandatory version exists

  const lastMandatoryVersion = await Version.findOne({
    appType,
    platform,
    mandatory: true,
  }).sort({ createdAt: -1 });

  if (lastMandatoryVersion) {
    minVersion = lastMandatoryVersion.version;
  }

  const newVersion = new Version({
    appType,
    platform,
    version,
    minVersion,
    mandatory: mandatory || false,
  });

  await newVersion.save();
  return newVersion;
};

// Get the latest version by appType and platform
const getLatestVersion = async (appType, platform) => {
  const version = await Version.findOne({ appType, platform }).sort({
    createdAt: -1,
  });

  if (!version) {
    throw new NotFoundError('No version found');
  }

  return version;
};

// Update a version
const updateVersion = async (versionDoc, updateData) => {
  const { version, mandatory } = updateData;

  if (version !== undefined) {
    versionDoc.version = version;
  }

  if (mandatory !== undefined) {
    versionDoc.mandatory = mandatory;
  }

  // Recalculate minVersion based on last mandatory version for same appType and platform
  const lastMandatoryVersion = await Version.findOne({
    appType: versionDoc.appType,
    platform: versionDoc.platform,
    mandatory: true,
    _id: { $ne: versionDoc._id }, // Exclude current version
  }).sort({ createdAt: -1 });

  if (lastMandatoryVersion) {
    versionDoc.minVersion = lastMandatoryVersion.version;
  } else if (versionDoc.mandatory) {
    // If this is the only mandatory version, set minVersion to this version
    versionDoc.minVersion = versionDoc.version;
  }

  await versionDoc.save();
  return versionDoc;
};

// Delete a version
const deleteVersion = async (versionDoc) => {
  await versionDoc.deleteOne();
};

// Get all versions
const getAllVersions = async (query) => {
  const { appType, platform } = query;
  const orderBy = query.orderBy || 'createdAt';
  const order = query.order || 'desc';
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === 'desc' ? -1 : 1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = {};
  if (appType) filter.appType = appType;
  if (platform) filter.platform = platform;

  const [versions, total] = await Promise.all([
    Version.find(filter)
      .sort({ [orderBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Version.countDocuments(filter),
  ]);

  return {
    versions,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
};

module.exports = {
  createVersion,
  getLatestVersion,
  updateVersion,
  deleteVersion,
  getAllVersions,
};
