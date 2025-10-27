const express = require("express");
const router = express.Router();
const adController = require("../ad.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");
const { uploadImage } = require("../../../middlewares/uploadImage");
const adminMiddleware = require("../../../middlewares/admin.middleware");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Ad = require("../ad.model");

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

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  adController.getAllAdsForAdmin
);

module.exports = router;
