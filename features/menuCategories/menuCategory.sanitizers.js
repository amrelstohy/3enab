const sanitizeCategory = (category) => {
  return {
    _id: category._id,
    name: category.name,
    description: category.description,
    vendor: category.vendor,
    isActive: category.isActive,
    order: category.order,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

const sanitizeCategories = (categories) => {
  return categories.map((c) => sanitizeCategory(c));
};

module.exports = { sanitizeCategory, sanitizeCategories };
