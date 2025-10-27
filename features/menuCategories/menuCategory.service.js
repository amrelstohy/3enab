const MenuCategory = require("./menuCategory.model");
const { ConflictError, NotFoundError } = require("../../utils/errors");
const {
  sanitizeMenuCategory,
  sanitizeMenuCategories,
} = require("./menuCategory.sanitizers");

// Create menu category
const createMenuCategory = async (vendor, data) => {
  const { name, description } = data;

  const numMenuCategories = await MenuCategory.countDocuments({
    vendor: vendor._id,
  });
  console.log(numMenuCategories);

  const menuCategory = new MenuCategory({
    name,
    description,
    vendor: vendor._id,
    order: numMenuCategories + 1,
  });

  await menuCategory.save();
  return sanitizeMenuCategory(menuCategory);
};

// Update menu category
const updateMenuCategory = async (menuCategory, data) => {
  const { name, description } = data;
  menuCategory.name = name || menuCategory.name;
  menuCategory.description = description || menuCategory.description;
  await menuCategory.save();
  return sanitizeMenuCategory(menuCategory);
};

// Delete menu category
const deleteMenuCategory = async (menuCategory) => {
  await menuCategory.deleteOne();
  const existingMenuCategories = await MenuCategory.find({
    vendor: menuCategory.vendor,
  })
    .sort({ order: 1 })
    .select("_id");
  await MenuCategory.bulkWrite(
    existingMenuCategories.map((mc, index) => ({
      updateOne: {
        filter: { _id: mc._id },
        update: { order: index + 1 },
      },
    }))
  );
};

// Get menu categories
const getMenuCategories = async (vendor) => {
  const menuCategories = await MenuCategory.find({
    vendor: vendor._id,
    isActive: true,
  })
    .sort({
      order: 1,
    })
    .lean();

  return sanitizeMenuCategories(menuCategories);
};

// Get single menu category
const getMenuCategoryById = async (menuCategory) => {
  if (!menuCategory.isActive) {
    throw new NotFoundError("Menu category not found");
  }
  return sanitizeMenuCategory(menuCategory);
};

// Update menu category active status
const updateActive = async (menuCategory, isActive) => {
  if (menuCategory.isActive === isActive) {
    throw new ConflictError(
      "Menu category active status is already set to this value"
    );
  }
  menuCategory.isActive = isActive;
  await menuCategory.save();
  return sanitizeMenuCategory(menuCategory);
};

// Update order for menu categories
const updateMenuCategoryOrder = async (vendor, orderedArray) => {
  const allMenuCategories = await MenuCategory.find({
    vendor: vendor._id,
  }).select("_id");

  const allIds = allMenuCategories.map((mc) => mc._id.toString());

  const missingIds = allIds.filter((id) => !orderedArray.includes(id));

  if (missingIds.length > 0) {
    throw new NotFoundError(
      `Missing menu categories: ${missingIds.join(", ")}`
    );
  }

  await MenuCategory.bulkWrite(
    orderedArray.map((id, index) => ({
      updateOne: {
        filter: { _id: id, vendor: vendor._id },
        update: { order: index + 1 },
      },
    }))
  );

  const updated = await MenuCategory.find({ vendor: vendor._id }).sort("order");
  return sanitizeMenuCategories(updated);
};

// Get all menu categories for admin
const getAllMenuCategoriesForAdmin = async (vendor) => {
  const menuCategories = await MenuCategory.find({ vendor: vendor._id }).sort(
    "order"
  );
  return sanitizeMenuCategories(menuCategories);
};

module.exports = {
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  getMenuCategories,
  getMenuCategoryById,
  updateActive,
  updateMenuCategoryOrder,
  getAllMenuCategoriesForAdmin,
};
