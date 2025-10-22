const sanitizeVendor = (vendor) => {
  let imageLink;
  let imagePath = vendor.logoPath;
  if (imagePath) {
    imageLink = imagePath.replace(/\\/g, "/");
  } else {
    imageLink = null;
  }

  return {
    _id: vendor._id.toString(),
    name: vendor.name,
    description: vendor.description,
    category: vendor.category,
    workingHours: vendor.workingHours,
    isActive: vendor.isActive,
    owner: vendor.owner,
    averageRate: vendor.averageRate,
    totalRates: vendor.totalRates,
    logoPath: imageLink,
    createdAt: vendor.createdAt,
    updatedAt: vendor.updatedAt,
  };
};

const sanitizeVendors = (vendors) => {
  return vendors.map((vendor) => sanitizeVendor(vendor));
};

module.exports = { sanitizeVendor, sanitizeVendors };
