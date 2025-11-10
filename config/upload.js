const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createSingleImageUploader = (folderName, id) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const ext = file.mimetype.split("/")[1];
      return {
        folder: `uploads/${folderName}`,
        public_id: `${id}`,
        format: ext,
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
      };
    },
  });

  return multer({ storage });
};

const createMultiImageUploader = (folderName, id) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const ext = file.mimetype.split("/")[1];
      const randomNum = Math.floor(Math.random() * 10000);
      const timestamp = Date.now();
      return {
        folder: `uploads/${folderName}/${id}`,
        public_id: `${timestamp}-${randomNum}`,
        format: ext,
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
      };
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });
};

module.exports = {
  createSingleImageUploader,
  createMultiImageUploader,
};

// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const imageFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(
//       new Error("Only image files (JPG, PNG, WEBP) are allowed!"),
//       false
//     );
//   }

//   cb(null, true);
// };

// const createSingleImageUploader = (folderName, id) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = path.join(__dirname, `../uploads/${folderName}`);
//       fs.mkdirSync(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const ext = file.mimetype.split("/")[1];
//       cb(null, `${id}.${ext}`);
//     },
//   });

//   return multer({ storage, fileFilter: imageFilter });
// };

// const createMultiImageUploader = (baseFolder, id) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = path.join(__dirname, `../uploads/${baseFolder}/${id}`);
//       fs.mkdirSync(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const ext = file.mimetype.split("/")[1];
//       const randomNum = Math.floor(Math.random() * 10000);
//       cb(null, `${Date.now()}-${randomNum}.${ext}`);
//     },
//   });

//   return multer({
//     storage,
//     fileFilter: imageFilter,
//     limits: { fileSize: 5 * 1024 * 1024 },
//   });
// };

// module.exports = {
//   createSingleImageUploader,
//   createMultiImageUploader,
// };
