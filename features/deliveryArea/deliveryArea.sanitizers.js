const sanitizeDeliveryArea = (deliveryArea) => {
  if (!deliveryArea) return null;

  return {
    _id: deliveryArea._id,
    name: deliveryArea.name,
    deliveryFee: deliveryArea.deliveryFee,
    estimatedTime: deliveryArea.estimatedTime,
    isActive: deliveryArea.isActive,
    createdAt: deliveryArea.createdAt,
    updatedAt: deliveryArea.updatedAt,
  };
};

const sanitizeDeliveryAreas = (deliveryAreas) => {
  if (!Array.isArray(deliveryAreas)) return [];
  return deliveryAreas.map((area) => sanitizeDeliveryArea(area));
};

module.exports = { sanitizeDeliveryArea, sanitizeDeliveryAreas };
