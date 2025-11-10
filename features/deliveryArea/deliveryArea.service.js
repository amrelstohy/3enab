const DeliveryArea = require("./deliveryArea.model");
const { NotFoundError, ConflictError } = require("../../utils/errors");
const {
  sanitizeDeliveryArea,
  sanitizeDeliveryAreas,
} = require("./deliveryArea.sanitizers");

// Create delivery area
const createDeliveryArea = async (data) => {
  const { name, deliveryFee, estimatedTime } = data;

  // Check if delivery area name already exists
  const existingArea = await DeliveryArea.findOne({ name });
  if (existingArea) {
    throw new ConflictError("Delivery area with this name already exists");
  }

  const deliveryArea = new DeliveryArea({
    name,
    deliveryFee,
    estimatedTime,
  });

  await deliveryArea.save();
  return sanitizeDeliveryArea(deliveryArea);
};

// Get all delivery areas
const getDeliveryAreas = async (query, filters = {}) => {
  const search = query.search || "";

  const filter = { ...filters };
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const deliveryAreas = await DeliveryArea.find(filter)
    .sort({ name: 1 }) // Sort by name ascending
    .lean();

  return sanitizeDeliveryAreas(deliveryAreas);
};

// Get delivery area by ID
const getDeliveryAreaById = async (deliveryArea) => {
  return sanitizeDeliveryArea(deliveryArea);
};

// Update delivery area
const updateDeliveryArea = async (deliveryArea, data) => {
  const { name, deliveryFee, estimatedTime, isActive } = data;

  // If updating name, check uniqueness
  if (name && name !== deliveryArea.name) {
    const existingArea = await DeliveryArea.findOne({ name });
    if (existingArea) {
      throw new ConflictError("Delivery area with this name already exists");
    }
    deliveryArea.name = name;
  }

  if (deliveryFee !== undefined) deliveryArea.deliveryFee = deliveryFee;
  if (estimatedTime !== undefined) deliveryArea.estimatedTime = estimatedTime;
  if (isActive !== undefined) deliveryArea.isActive = isActive;

  await deliveryArea.save();
  return sanitizeDeliveryArea(deliveryArea);
};

// Delete delivery area
const deleteDeliveryArea = async (deliveryArea) => {
  await deliveryArea.deleteOne();
  return sanitizeDeliveryArea(deliveryArea);
};

module.exports = {
  createDeliveryArea,
  getDeliveryAreas,
  getDeliveryAreaById,
  updateDeliveryArea,
  deleteDeliveryArea,
};
