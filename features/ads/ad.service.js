const Ad = require("./ad.model");
const { NotFoundError } = require("../../utils/errors");
const { sanitizeAd, sanitizeAds } = require("./ad.sanitizers");
const { removeImage } = require("../../utils/image");
const path = require("path");

// Create ad
const createAd = async (adData) => {
  const { name, link } = adData;

  const ad = new Ad({
    name,
    link: link || null,
  });

  await ad.save();
  return sanitizeAd(ad);
};

// Upload ad image
const uploadAdImage = async (ad, file) => {
  ad.imagePath = file.webPath || null;
  ad.markModified("imagePath");

  await ad.save();
  return sanitizeAd(ad);
};

// Get ad image
const getAdImage = async (ad) => {
  if (!ad.imagePath) {
    throw new NotFoundError("Ad image not found");
  }
  return path.join(__dirname, "..", "..", ad.imagePath);
};

// Update ad
const updateAd = async (ad, updateData) => {
  const { name, link } = updateData;

  ad.name = name;
  ad.link = link ? link : null;
  await ad.save();
  return sanitizeAd(ad);
};

// Delete ad
const deleteAd = async (ad) => {
  if (ad.imagePath) {
    await removeImage(ad.imagePath);
  }
  await ad.deleteOne();
};

// Get all ads
const getAds = async (query) => {
  const orderBy = query.orderBy || "createdAt";
  const order = query.order || "desc";
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === "desc" ? -1 : 1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = { isActive: true };

  const [ads, total] = await Promise.all([
    Ad.find(filter)
      .sort({
        [orderBy]: sortOrder,
      })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Ad.countDocuments(filter),
  ]);

  return {
    ads: sanitizeAds(ads),
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
};

// Get ad by id
const getAdById = async (ad) => {
  return sanitizeAd(ad);
};

// Activate ad
const activateAd = async (ad) => {
  ad.isActive = true;
  await ad.save();
  return sanitizeAd(ad);
};

// Deactivate ad
const deactivateAd = async (ad) => {
  ad.isActive = false;
  await ad.save();
  return sanitizeAd(ad);
};

// Get all ads for admin
const getAllAdsForAdmin = async (query) => {
  const search = query.search || "";
  const orderBy = query.orderBy || "createdAt";
  const order = query.order || "desc";
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === "desc" ? -1 : 1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = {};
  if (search.trim()) {
    filter.name = { $regex: search, $options: "i" };
  }

  const [ads, total] = await Promise.all([
    Ad.find(filter)
      .sort({
        [orderBy]: sortOrder,
      })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Ad.countDocuments(filter),
  ]);

  return {
    ads: sanitizeAds(ads),
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
};

module.exports = {
  createAd,
  uploadAdImage,
  getAdImage,
  updateAd,
  deleteAd,
  getAds,
  getAdById,
  activateAd,
  deactivateAd,
  getAllAdsForAdmin,
};
