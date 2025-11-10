// const fs = require("fs");
// const path = require("path");
// const { NotFoundError } = require("./errors");

// const removeImage = async (imagePath) => {
//   const fullPath = path.join(__dirname, "..", imagePath);

//   if (fs.existsSync(fullPath)) {
//     await fs.promises.unlink(fullPath);
//   } else {
//     throw new NotFoundError("Image not found");
//   }
// };

// module.exports = {
//   removeImage,
// };

const cloudinary = require("cloudinary").v2;
const { NotFoundError } = require("./errors");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * حذف الصورة من Cloudinary باستخدام المسار الكامل (URL)
 */
const removeImage = async (imageUrl) => {
  if (!imageUrl) throw new NotFoundError("Image path is missing");

  // استخرج الـ public_id من الرابط
  const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
  if (!match || !match[1])
    throw new NotFoundError("Invalid Cloudinary image URL");

  const publicId = match[1]; // مثلاً "uploads/vendors/66f87b4a6f"

  // حذف الصورة من Cloudinary
  const result = await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new NotFoundError("Failed to delete image from Cloudinary");
  }

  return result;
};

module.exports = { removeImage };
