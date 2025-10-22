const menuCategoryService = require("./menuCategory.service");

// Create category
const createCategory = async (req, res) => {
  const category = await menuCategoryService.createCategory(
    req.vendor,
    req.body
  );
  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: { category },
  });
};

// Update category
const updateCategory = async (req, res) => {
  const category = await menuCategoryService.updateCategory(
    req.category,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: { category },
  });
};

// Delete category
const deleteCategory = async (req, res) => {
  await menuCategoryService.deleteCategory(req.category);
  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
};

// Get categories
const getCategories = async (req, res) => {
  const categories = await menuCategoryService.getCategories(req.vendor);
  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data: { categories },
  });
};

// Get single category
const getCategory = async (req, res) => {
  const category = await menuCategoryService.getCategoryById(req.category);
  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: { category },
  });
};

// Activate category
const activateCategory = async (req, res) => {
  const category = await menuCategoryService.activateCategory(req.category);
  res.status(200).json({
    status: "success",
    message: "Category activated successfully",
    data: { category },
  });
};

// Deactivate category
const deactivateCategory = async (req, res) => {
  const category = await menuCategoryService.deactivateCategory(req.category);
  res.status(200).json({
    status: "success",
    message: "Category deactivated successfully",
    data: { category },
  });
};

// Update category order
const updateOrder = async (req, res) => {
  const { orderedArray } = req.body;
  const categories = await menuCategoryService.updateOrder(
    req.vendor,
    orderedArray
  );
  res.status(200).json({
    status: "success",
    message: "Category order updated successfully",
    data: { categories },
  });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategory,
  activateCategory,
  deactivateCategory,
  updateOrder,
};
