const adService = require("./ad.service");

// Create ad
const createAd = async (req, res) => {
  const ad = await adService.createAd(req.body);
  res.status(201).json({
    status: "success",
    message: "Ad created successfully",
    data: { ad },
  });
};

// Upload ad image
const uploadAdImage = async (req, res) => {
  const ad = await adService.uploadAdImage(req.ad, req.file);
  res.status(200).json({
    status: "success",
    message: "Ad image uploaded successfully",
    data: { ad },
  });
};

// Get ad image
const getAdImage = async (req, res) => {
  const imagePath = await adService.getAdImage(req.ad);
  res.status(200).sendFile(imagePath);
};

// Update ad
const updateAd = async (req, res) => {
  const ad = await adService.updateAd(req.ad, req.body);
  res.status(200).json({
    status: "success",
    message: "Ad updated successfully",
    data: { ad },
  });
};

// Delete ad
const deleteAd = async (req, res) => {
  await adService.deleteAd(req.ad);
  res.status(200).json({
    status: "success",
    message: "Ad deleted successfully",
  });
};

// Get all ads
const getAds = async (req, res) => {
  const data = await adService.getAds(req.query);
  res.status(200).json({
    status: "success",
    message: "Ads fetched successfully",
    data,
  });
};

// Get ad by id
const getAd = async (req, res) => {
  const ad = await adService.getAdById(req.ad);
  res.status(200).json({
    status: "success",
    message: "Ad fetched successfully",
    data: { ad },
  });
};

// Activate ad
const activateAd = async (req, res) => {
  const ad = await adService.activateAd(req.ad);
  res.status(200).json({
    status: "success",
    message: "Ad activated successfully",
    data: { ad },
  });
};

// Deactivate ad
const deactivateAd = async (req, res) => {
  const ad = await adService.deactivateAd(req.ad);
  res.status(200).json({
    status: "success",
    message: "Ad deactivated successfully",
    data: { ad },
  });
};

module.exports = {
  createAd,
  uploadAdImage,
  getAdImage,
  updateAd,
  deleteAd,
  getAds,
  getAd,
  activateAd,
  deactivateAd,
};
