const sanitizeItem = (item) => {
  let imagePath = item.imagePath;
  if (imagePath) {
    imagePath = imagePath.replace(/\\/g, "/");
  } else {
    imagePath = null;
  }

  return {
    _id: item._id,
    name: item.name,
    description: item.description,
    basePrice: item.basePrice,
    discount: item.discount,
    status: item.status,
    order: item.order,
    category: item.category,
    prepTime: item.prepTime,
    imagePath: imagePath,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const sanitizeItems = (items) => {
  return items.map((item) => sanitizeItem(item));
};

module.exports = { sanitizeItem, sanitizeItems };
