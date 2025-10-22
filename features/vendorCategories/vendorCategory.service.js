const VendorCategory = require("./vendorCategory.model");
const { ConflictError, NotFoundError } = require("../../utils/errors");
const {
  sanitizeVendorCategory,
  sanitizeVendorCategories,
} = require("./vendorCategory.sanitizers");

// Create vendor category
const createVendorCategory = async (data) => {
  const { name, description } = data;

  const numCategories = await VendorCategory.countDocuments();

  const vendorCategory = new VendorCategory({
    name,
    description,
    order: numCategories + 1,
  });

  await vendorCategory.save();
  return sanitizeVendorCategory(vendorCategory);
};

// Update vendor category
const updateVendorCategory = async (vendorCategory, data) => {
  const { name, description } = data;
  vendorCategory.name = name || vendorCategory.name;
  vendorCategory.description = description || vendorCategory.description;
  await vendorCategory.save();
  return sanitizeVendorCategory(vendorCategory);
};

// Delete vendor category
const deleteVendorCategory = async (vendorCategory) => {
  await vendorCategory.deleteOne();

  const existingCategories = await VendorCategory.find()
    .sort({ order: 1 })
    .select("_id");
  await VendorCategory.bulkWrite(
    existingCategories.map((category, index) => ({
      updateOne: {
        filter: { _id: category._id },
        update: { order: index + 1 },
      },
    }))
  );
};

// Get vendor categories
const getVendorCategories = async () => {
  const vendorCategories = await VendorCategory.find({
    isActive: true,
  })
    .sort({
      order: 1,
    })
    .lean();

  return sanitizeVendorCategories(vendorCategories);
};

// Get single vendor category
const getVendorCategoryById = async (vendorCategory) => {
  return sanitizeVendorCategory(vendorCategory);
};

// Update status
const updateStatus = async (vendorCategory, isActive) => {
  vendorCategory.isActive = isActive;
  await vendorCategory.save();
  return sanitizeVendorCategory(vendorCategory);
};

// Update order for vendor categories
const updateOrder = async (orderedArray) => {
  const allCategories = await VendorCategory.find().select("_id");

  const allIds = allCategories.map((c) => c._id.toString());

  const missingIds = allIds.filter((id) => !orderedArray.includes(id));

  if (missingIds.length > 0) {
    throw new NotFoundError(
      `Missing vendor categories: ${missingIds.join(", ")}`
    );
  }

  await VendorCategory.bulkWrite(
    orderedArray.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index + 1 },
      },
    }))
  );

  const updated = await VendorCategory.find({
    isActive: true,
  })
    .sort({
      order: 1,
    })
    .lean();
  return sanitizeVendorCategories(updated);
};

// Upload image
const uploadImage = async (vendorCategory, file) => {
  console.log(vendorCategory);
  vendorCategory.imagePath = file.webPath || null;
  vendorCategory.markModified("imagePath");
  await vendorCategory.save();
  return sanitizeVendorCategory(vendorCategory);
};

module.exports = {
  createVendorCategory,
  updateVendorCategory,
  deleteVendorCategory,
  getVendorCategories,
  getVendorCategoryById,
  updateStatus,
  updateOrder,
  uploadImage,
};
