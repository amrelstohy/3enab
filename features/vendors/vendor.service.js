const Vendor = require("./vendor.model");
const { NotFoundError, ConflictError } = require("../../utils/errors");
const { sanitizeVendor, sanitizeVendors } = require("./vendor.sanitizers");
const path = require("path");
const { removeImage } = require("../../utils/image");

// Create vendor
const createVendor = async (user, vendorData) => {
  const { name, description, categoryId, openHour, closeHour, days } =
    vendorData;

  const vendor = new Vendor({
    name,
    description,
    category: categoryId,
    workingHours: { open: openHour, close: closeHour, days },
    owner: user._id,
  });

  await vendor.save();
  return sanitizeVendor(vendor);
};

// Update vendor
const updateVendor = async (vendor, updateData) => {
  const { name, description, categoryId, openHour, closeHour, days } =
    updateData;

  vendor.name = name;
  vendor.description = description;
  vendor.category = categoryId;
  vendor.workingHours = { open: openHour, close: closeHour, days };
  await vendor.save();

  return sanitizeVendor(vendor);
};

// Upload logo
const uploadLogo = async (vendor, file) => {
  vendor.logoPath = file.webPath || null;
  vendor.markModified("logoPath");
  await vendor.save();

  return sanitizeVendor(vendor);
};

// Get logo
const getLogo = async (vendorId) => {
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    throw new NotFoundError("Vendor not found");
  }
  if (!vendor.logoPath) {
    throw new NotFoundError("Logo not found");
  }
  return path.join(__dirname, "..", "..", vendor.logoPath);
};

// Delete vendor by id
const deleteVendor = async (vendor) => {
  await vendor.deleteOne();

  if (vendor.logoPath) {
    await removeImage(vendor.logoPath);
  }
};

// Get all vendors
const getVendors = async (query) => {
  const categoryId = query.categoryId || "";
  const orderBy = query.orderBy || "createdAt";
  const order = query.order || "desc";
  const search = query.search || "";
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === "desc" ? -1 : 1;

  const filter = { isActive: true };
  if (categoryId) {
    filter.category = categoryId;
  }
  if (search.trim()) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [vendors, total] = await Promise.all([
    Vendor.find(filter)
      .sort({
        [orderBy]: sortOrder,
      })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Vendor.countDocuments(filter),
  ]);

  return {
    vendors: sanitizeVendors(vendors),
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
};

// Get vendor by id
const getVendorById = async (vendorId) => {
  const vendor = await Vendor.findOne({ _id: vendorId, isActive: true }).lean();

  if (!vendor) {
    throw new NotFoundError("Vendor not found");
  }

  return sanitizeVendor(vendor);
};

// update active
const updateActive = async (vendor) => {
  if (vendor.isActive) {
    throw new ConflictError("Vendor is already active");
  }
  vendor.isActive = true;
  await vendor.save();
  return sanitizeVendor(vendor);
};

// update inactive
const updateInactive = async (vendor) => {
  if (!vendor.isActive) {
    throw new ConflictError("Vendor is already inactive");
  }
  vendor.isActive = false;
  await vendor.save();
  return sanitizeVendor(vendor);
};

module.exports = {
  createVendor,
  updateVendor,
  uploadLogo,
  getLogo,
  deleteVendor,
  getVendors,
  getVendorById,
  updateActive,
  updateInactive,
};
