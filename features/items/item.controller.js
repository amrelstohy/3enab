const itemService = require("./item.service");

// Create item
const createItem = async (req, res) => {
  const item = await itemService.createItem(req.body, req.category);
  res.status(201).json({
    status: "success",
    message: "Item created successfully",
    data: { item },
  });
};

// Upload item image
const uploadItemImage = async (req, res) => {
  const item = await itemService.uploadItemImage(req.item, req.file);
  res.status(200).json({
    status: "success",
    message: "Item image uploaded successfully",
    data: { item },
  });
};

// Get item image
const getItemImage = async (req, res) => {
  const imagePath = await itemService.getItemImage(req.item);
  res.status(200).sendFile(imagePath);
};

// Update item
const updateItem = async (req, res) => {
  const item = await itemService.updateItem(req.item, req.body);
  res.status(200).json({
    status: "success",
    message: "Item updated successfully",
    data: { item },
  });
};

// Delete item
const deleteItem = async (req, res) => {
  await itemService.deleteItem(req.item);
  res.status(200).json({
    status: "success",
    message: "Item deleted successfully",
  });
};

// Get all items
const getItems = async (req, res) => {
  const items = await itemService.getItems(req.params);
  res.status(200).json({
    status: "success",
    message: "Items fetched successfully",
    data: { items },
  });
};

// Get item by id
const getItem = async (req, res) => {
  const item = await itemService.getItemById(req.item);
  res.status(200).json({
    status: "success",
    message: "Item fetched successfully",
    data: { item },
  });
};

// Update item order
const updateOrder = async (req, res) => {
  const items = await itemService.updateOrder(
    req.category,
    req.body.orderedArray
  );
  res.status(200).json({
    status: "success",
    message: "Item order updated successfully",
    data: { items },
  });
};

// Update item status
const updateStatus = async (req, res) => {
  const item = await itemService.updateStatus(req.item, req.body);
  res.status(200).json({
    status: "success",
    message: "Item status updated successfully",
    data: { item },
  });
};

// Update item discount
const updateDiscount = async (req, res) => {
  const discountData = req.body;
  const item = await itemService.updateDiscount(req.item, discountData);
  res.status(200).json({
    status: "success",
    message: "Item discount updated successfully",
    data: { item },
  });
};

// Remove item discount
const removeDiscount = async (req, res) => {
  const item = await itemService.removeDiscount(req.item);
  res.status(200).json({
    status: "success",
    message: "Item discount removed successfully",
    data: { item },
  });
};

module.exports = {
  createItem,
  uploadItemImage,
  getItemImage,
  updateItem,
  deleteItem,
  getItems,
  getItem,
  updateOrder,
  updateStatus,
  updateDiscount,
  removeDiscount,
};
