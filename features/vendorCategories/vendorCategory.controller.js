const vendorCategoryService = require("./vendorCategory.service");

// Create vendor category
const createVendorCategory = async (req, res) => {
  const vendorCategory = await vendorCategoryService.createVendorCategory(
    req.body
  );
  res.status(201).json({
    status: "success",
    message: "Vendor category created successfully",
    data: { vendorCategory },
  });
};

// Update vendor category
const updateVendorCategory = async (req, res) => {
  const vendorCategory = await vendorCategoryService.updateVendorCategory(
    req.vendorCategory,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Vendor category updated successfully",
    data: { vendorCategory },
  });
};

// Delete vendor category
const deleteVendorCategory = async (req, res) => {
  await vendorCategoryService.deleteVendorCategory(req.vendorCategory);
  res.status(200).json({
    status: "success",
    message: "Vendor category deleted successfully",
  });
};

// Get vendor categories
const getVendorCategories = async (req, res) => {
  const vendorCategories = await vendorCategoryService.getVendorCategories();
  res.status(200).json({
    status: "success",
    message: "Vendor categories fetched successfully",
    data: { vendorCategories },
  });
};

// Get single vendor category
const getVendorCategory = async (req, res) => {
  const vendorCategory = await vendorCategoryService.getVendorCategoryById(
    req.vendorCategory
  );
  res.status(200).json({
    status: "success",
    message: "Vendor category fetched successfully",
    data: { vendorCategory },
  });
};

// Update status
const updateStatus = async (req, res) => {
  const vendorCategory = await vendorCategoryService.updateStatus(
    req.vendorCategory,
    req.body.isActive
  );
  res.status(200).json({
    status: "success",
    message: req.body.isActive
      ? "Vendor category activated successfully"
      : "Vendor category deactivated successfully",
    data: { vendorCategory },
  });
};

// Update order
const updateOrder = async (req, res) => {
  const { orderedArray } = req.body;
  const vendorCategories = await vendorCategoryService.updateOrder(
    orderedArray
  );
  res.status(200).json({
    status: "success",
    message: "Vendor category order updated successfully",
    data: { vendorCategories },
  });
};

// Upload image
const uploadImage = async (req, res) => {
  const vendorCategory = await vendorCategoryService.uploadImage(
    req.vendorCategory,
    req.file
  );
  res.status(200).json({
    status: "success",
    message: "Vendor category image uploaded successfully",
    data: { vendorCategory },
  });
};

module.exports = {
  createVendorCategory,
  updateVendorCategory,
  deleteVendorCategory,
  getVendorCategories,
  getVendorCategory,
  updateStatus,
  updateOrder,
  uploadImage,
};
