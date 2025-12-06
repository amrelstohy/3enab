const Version = require('./version.model');
const { NotFoundError } = require('../../utils/errors');

// Create a new version
const createVersion = async (versionData) => {
  const { version, mandatory } = versionData;

  // Get the last mandatory version to set as minVersion
  let minVersion = version; // Default to current version if no mandatory version exists

  const lastMandatoryVersion = await Version.findOne({ mandatory: true }).sort({
    createdAt: -1,
  });

  if (lastMandatoryVersion) {
    minVersion = lastMandatoryVersion.version;
  }

  const newVersion = new Version({
    version,
    minVersion,
    mandatory: mandatory || false,
  });

  await newVersion.save();
  return newVersion;
};

// Get the latest version
const getLatestVersion = async () => {
  const version = await Version.findOne().sort({ createdAt: -1 });

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

  // Recalculate minVersion based on last mandatory version
  const lastMandatoryVersion = await Version.findOne({
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
  const orderBy = query.orderBy || 'createdAt';
  const order = query.order || 'desc';
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === 'desc' ? -1 : 1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [versions, total] = await Promise.all([
    Version.find()
      .sort({ [orderBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Version.countDocuments(),
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
