const Category = require("./menuCategory.model");
const { ConflictError, NotFoundError } = require("../../utils/errors");
const {
  sanitizeCategory,
  sanitizeCategories,
} = require("./menuCategory.sanitizers");

// Create category
const createCategory = async (vendor, data) => {
  const { name, description } = data;

  const numCategories = await Category.countDocuments({ vendor: vendor._id });
  console.log(numCategories);

  const category = new Category({
    name,
    description,
    vendor: vendor._id,
    order: numCategories + 1,
  });

  await category.save();
  return sanitizeCategory(category);
};

// Update category
const updateCategory = async (category, data) => {
  const { name, description } = data;
  category.name = name || category.name;
  category.description = description || category.description;
  await category.save();
  return sanitizeCategory(category);
};

// Delete category
const deleteCategory = async (category) => {
  await category.deleteOne();
  const existingCategories = await Category.find({
    vendor: category.vendor,
  })
    .sort({ order: 1 })
    .select("_id");
  await Category.bulkWrite(
    existingCategories.map((category, index) => ({
      updateOne: {
        filter: { _id: category._id },
        update: { order: index + 1 },
      },
    }))
  );
};

// Get categories
const getCategories = async (vendor) => {
  const categories = await Category.find({
    vendor: vendor._id,
    isActive: true,
  })
    .sort({
      order: 1,
    })
    .lean();

  return sanitizeCategories(categories);
};

// Get single category
const getCategoryById = async (category) => {
  if (!category.isActive) {
    throw new NotFoundError("Category not found");
  }
  return sanitizeCategory(category);
};

// Activate category
const activateCategory = async (category) => {
  if (category.isActive) {
    throw new ConflictError("Category is already active");
  }
  category.isActive = true;
  await category.save();
  return sanitizeCategory(category);
};

// Deactivate category
const deactivateCategory = async (category) => {
  if (!category.isActive) {
    throw new ConflictError("Category is already inactive");
  }
  category.isActive = false;
  await category.save();
  return sanitizeCategory(category);
};

// Update order for categories
const updateOrder = async (vendor, orderedArray) => {
  const allCategories = await Category.find({
    vendor: vendor._id,
  }).select("_id");

  const allIds = allCategories.map((c) => c._id.toString());

  const missingIds = allIds.filter((id) => !orderedArray.includes(id));

  if (missingIds.length > 0) {
    throw new NotFoundError(`Missing categories: ${missingIds.join(", ")}`);
  }

  await Category.bulkWrite(
    orderedArray.map((id, index) => ({
      updateOne: {
        filter: { _id: id, vendor: vendor._id },
        update: { order: index + 1 },
      },
    }))
  );

  const updated = await Category.find({ vendor: vendor._id }).sort("order");
  return sanitizeCategories(updated);
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  activateCategory,
  deactivateCategory,
  updateOrder,
};
