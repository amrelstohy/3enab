const express = require("express");
const router = express.Router();
const adController = require("../ad.controller");
const { uploadImage } = require("../../../middlewares/uploadImage");
const isResourceExists = require("../../../middlewares/isResourceExists");
const Ad = require("../ad.model");

// Routes
router.post("", adController.createAd);
router.post(
  "/:adId/image",
  isResourceExists(Ad, "adId"),
  uploadImage("ads", "adId"),
  adController.uploadAdImage
);

router.put("/:adId", isResourceExists(Ad, "adId"), adController.updateAd);
router.delete("/:adId", isResourceExists(Ad, "adId"), adController.deleteAd);

router.patch(
  "/:adId/activate",
  isResourceExists(Ad, "adId"),
  adController.activateAd
);
router.patch(
  "/:adId/deactivate",
  isResourceExists(Ad, "adId"),
  adController.deactivateAd
);

router.get("/admin/all", adController.getAllAdsForAdmin);

module.exports = router;
