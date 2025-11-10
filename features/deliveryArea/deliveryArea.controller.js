const deliveryAreaService = require("./deliveryArea.service");

// Create delivery area
const createDeliveryArea = async (req, res) => {
  const deliveryArea = await deliveryAreaService.createDeliveryArea(req.body);
  res.status(201).json({
    status: "success",
    message: "Delivery area created successfully",
    data: { deliveryArea },
  });
};

// Get all delivery areas
const getDeliveryAreas = async (req, res) => {
  // Check if it's a user request (apply filters for active areas only)
  const filters = req.user?.type === "user" ? { isActive: true } : {};

  const deliveryAreas = await deliveryAreaService.getDeliveryAreas(
    req.query,
    filters
  );
  res.status(200).json({
    status: "success",
    message: "Delivery areas fetched successfully",
    data: { deliveryAreas },
  });
};

// Get delivery area by ID
const getDeliveryAreaById = async (req, res) => {
  const deliveryArea = await deliveryAreaService.getDeliveryAreaById(
    req.deliveryArea
  );
  res.status(200).json({
    status: "success",
    message: "Delivery area fetched successfully",
    data: { deliveryArea },
  });
};

// Update delivery area
const updateDeliveryArea = async (req, res) => {
  const deliveryArea = await deliveryAreaService.updateDeliveryArea(
    req.deliveryArea,
    req.body
  );
  res.status(200).json({
    status: "success",
    message: "Delivery area updated successfully",
    data: { deliveryArea },
  });
};

// Delete delivery area
const deleteDeliveryArea = async (req, res) => {
  await deliveryAreaService.deleteDeliveryArea(req.deliveryArea);
  res.status(200).json({
    status: "success",
    message: "Delivery area deleted successfully",
  });
};

module.exports = {
  createDeliveryArea,
  getDeliveryAreas,
  getDeliveryAreaById,
  updateDeliveryArea,
  deleteDeliveryArea,
};
