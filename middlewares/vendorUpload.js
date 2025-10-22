const { createSingleImageUploader } = require("../config/upload");

const uploadLogo = async (req, res, next) => {
  const upload = createSingleImageUploader("vendorsLogos", req.vendor.id);
  upload.single("image")(req, res, next);
};

module.exports = { uploadLogo };
