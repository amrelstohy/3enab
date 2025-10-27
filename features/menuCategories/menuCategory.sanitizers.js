const sanitizeMenuCategory = (menuCategory) => {
  return {
    _id: menuCategory._id,
    name: menuCategory.name,
    description: menuCategory.description,
    vendor: menuCategory.vendor,
    isActive: menuCategory.isActive,
    order: menuCategory.order,
    createdAt: menuCategory.createdAt,
    updatedAt: menuCategory.updatedAt,
  };
};

const sanitizeMenuCategories = (menuCategories) => {
  return menuCategories.map((mc) => sanitizeMenuCategory(mc));
};

module.exports = { sanitizeMenuCategory, sanitizeMenuCategories };
