const fs = require("fs");
const path = require("path");
const { NotFoundError } = require("./errors");

const removeImage = async (imagePath) => {
  const fullPath = path.join(__dirname, "..", imagePath);

  if (fs.existsSync(fullPath)) {
    await fs.promises.unlink(fullPath);
  } else {
    throw new NotFoundError("Image not found");
  }
};

module.exports = {
  removeImage,
};
