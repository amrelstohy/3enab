const express = require("express");
const router = express.Router();
const adController = require("./ad.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const { uploadImage } = require("../../middlewares/uploadImage");
const adminMiddleware = require("../../middlewares/admin.middleware");
const isResourceExists = require("../../middlewares/isResourceExists");
const Ad = require("./ad.model");

// Import documentation
require("./ad.docs");

// Routes
router.post("", authMiddleware, adminMiddleware, adController.createAd);
router.post(
  "/:adId/image",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Ad, "adId"),
  uploadImage("ads", "adId"),
  adController.uploadAdImage
);
router.get(
  "/:adId/image",
  isResourceExists(Ad, "adId"),
  adController.getAdImage
);
router.put(
  "/:adId",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Ad, "adId"),
  adController.updateAd
);
router.delete(
  "/:adId",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Ad, "adId"),
  adController.deleteAd
);
router.get("", adController.getAds);
router.get("/:adId", isResourceExists(Ad, "adId"), adController.getAd);
router.patch(
  "/:adId/activate",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Ad, "adId"),
  adController.activateAd
);
router.patch(
  "/:adId/deactivate",
  authMiddleware,
  adminMiddleware,
  isResourceExists(Ad, "adId"),
  adController.deactivateAd
);

module.exports = router;
