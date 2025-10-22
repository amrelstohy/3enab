const { createSingleImageUploader } = require("../config/upload");
const path = require("path");

const uploadImage = (folderName, idParam) => async (req, res, next) => {
  const upload = createSingleImageUploader(folderName, req.params[idParam]);
  upload.single("image")(req, res, (err) => {
    if (err) return next(err);

    if (req.file) {
      const fullPath = req.file.path;
      const relativePath = fullPath
        .replace(path.resolve(__dirname, "../"), "")
        .replace(/\\/g, "/");

      req.file.webPath = relativePath;
    }

    next();
  });
};

module.exports = {
  uploadImage,
};
