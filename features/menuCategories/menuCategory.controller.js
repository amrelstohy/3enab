const menuCategoryService = require("./menuCategory.service");

// Create menu category
const createMenuCategory = async (req, res) => {
  const menuCategory = await menuCategoryService.createMenuCategory(
    req.vendor,
    req.body
  );
  res.status(201).json({
    status: "success",
    message: "Menu category created successfully",
    data: { menuCategory },
  });
};

// Update menu category
const updateMenuCategory = async (req, res) => {
  const menuCategory = await menuCategoryService.updateMenuCategory(
    req.menuCategory,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Menu category updated successfully",
    data: { menuCategory },
  });
};

// Delete menu category
const deleteMenuCategory = async (req, res) => {
  await menuCategoryService.deleteMenuCategory(req.menuCategory);
  res.status(200).json({
    status: "success",
    message: "Menu category deleted successfully",
  });
};

// Get menu categories
const getMenuCategories = async (req, res) => {
  const menuCategories = await menuCategoryService.getMenuCategories(
    req.vendor
  );
  res.status(200).json({
    status: "success",
    message: "Menu categories fetched successfully",
    data: { menuCategories },
  });
};

// Get single menu category
const getMenuCategory = async (req, res) => {
  const menuCategory = await menuCategoryService.getMenuCategoryById(
    req.menuCategory
  );
  res.status(200).json({
    status: "success",
    message: "Menu category fetched successfully",
    data: { menuCategory },
  });
};

// Update menu category active status
const updateActive = async (req, res) => {
  const menuCategory = await menuCategoryService.updateActive(
    req.menuCategory,
    req.body.isActive
  );
  res.status(200).json({
    status: "success",
    message: "Menu category active status updated successfully",
    data: { menuCategory },
  });
};

// Update menu category order
const updateMenuCategoryOrder = async (req, res) => {
  const { orderedArray } = req.body;
  const menuCategories = await menuCategoryService.updateMenuCategoryOrder(
    req.vendor,
    orderedArray
  );
  res.status(200).json({
    status: "success",
    message: "Menu category order updated successfully",
    data: { menuCategories },
  });
};

// Get all menu categories for admin
const getAllMenuCategoriesForAdmin = async (req, res) => {
  const menuCategories = await menuCategoryService.getAllMenuCategoriesForAdmin(
    req.vendor
  );
  res.status(200).json({
    status: "success",
    message: "Menu categories fetched successfully",
    data: { menuCategories },
  });
};

module.exports = {
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  getMenuCategories,
  getMenuCategory,
  updateActive,
  updateMenuCategoryOrder,
  getAllMenuCategoriesForAdmin,
};
