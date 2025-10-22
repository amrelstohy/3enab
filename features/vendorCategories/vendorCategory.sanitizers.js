const sanitizeVendorCategory = (vendorCategory) => {
  return {
    _id: vendorCategory._id,
    name: vendorCategory.name,
    description: vendorCategory.description,
    imagePath: vendorCategory.imagePath,
    isActive: vendorCategory.isActive,
    order: vendorCategory.order,
    createdAt: vendorCategory.createdAt,
    updatedAt: vendorCategory.updatedAt,
  };
};

const sanitizeVendorCategories = (vendorCategories) => {
  return vendorCategories.map((vc) => sanitizeVendorCategory(vc));
};

module.exports = { sanitizeVendorCategory, sanitizeVendorCategories };
