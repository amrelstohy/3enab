const Coupon = require("./coupon.model");
const { sanitizeCoupon, sanitizeCoupons } = require("./coupon.sanitizers");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../../utils/errors");

// Create a new coupon
const createCoupon = async (data) => {
  const {
    code,
    type,
    value,
    minOrderValue,
    maxDiscountValue,
    description,
    startDate,
    endDate,
    maxUsesPerUser,
    maxUses,
    allowedUser,
    vendors,
  } = data;

  // Check if coupon code already exists
  const existingCoupon = await Coupon.findOne({ code });
  if (existingCoupon) {
    throw new ConflictError("Coupon code already exists");
  }

  // Validate type and value
  if (type === "percentage" && (value < 0 || value > 100)) {
    throw new BadRequestError(
      "Percentage coupon value must be between 0 and 100"
    );
  }

  if (type === "fixed" && value < 0) {
    throw new BadRequestError(
      "Fixed coupon value must be greater than or equal to 0"
    );
  }

  // Validate dates
  if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
    throw new BadRequestError("End date must be after start date");
  }

  const coupon = await Coupon.create({
    code,
    type,
    value,
    minOrderValue,
    maxDiscountValue,
    description,
    startDate,
    endDate,
    maxUsesPerUser,
    maxUses,
    allowedUser,
    vendors,
  });

  return sanitizeCoupon(coupon);
};

// Get all coupons
const getCoupons = async (query, filters = {}) => {
  const search = query.search || "";
  const orderBy = query.orderBy || "createdAt";
  const order = query.order || "desc";
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === "desc" ? -1 : 1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = { ...filters };
  if (search) {
    filter.code = { $regex: search, $options: "i" };
  }

  const coupons = await Coupon.find(filter)
    .sort({ [orderBy]: sortOrder })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();
  const total = await Coupon.countDocuments(filter);

  return {
    coupons: sanitizeCoupons(coupons),
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
};

// Get coupon by ID
const getCouponById = async (coupon) => {
  return sanitizeCoupon(coupon);
};

// Update coupon
const updateCoupon = async (coupon, data) => {
  const {
    code,
    type,
    value,
    minOrderValue,
    maxDiscountValue,
    description,
    startDate,
    endDate,
    maxUsesPerUser,
    maxUses,
    allowedUser,
    vendors,
  } = data;

  // If updating code, check uniqueness
  if (code && code !== coupon.code) {
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      throw new ConflictError("Coupon code already exists");
    }
    coupon.code = code;
  }

  // Validate type and value if provided
  if (type) {
    if (type === "percentage" && value && (value < 0 || value > 100)) {
      throw new BadRequestError(
        "Percentage coupon value must be between 0 and 100"
      );
    }
    if (type === "fixed" && value && value < 0) {
      throw new BadRequestError(
        "Fixed coupon value must be greater than or equal to 0"
      );
    }
    coupon.type = type;
  }

  if (value !== undefined) coupon.value = value;
  if (minOrderValue !== undefined) coupon.minOrderValue = minOrderValue;
  if (maxDiscountValue !== undefined)
    coupon.maxDiscountValue = maxDiscountValue;
  if (description !== undefined) coupon.description = description;
  if (startDate !== undefined) coupon.startDate = startDate;
  if (endDate !== undefined) coupon.endDate = endDate;

  // Validate dates
  if (
    coupon.startDate &&
    coupon.endDate &&
    new Date(coupon.startDate) >= new Date(coupon.endDate)
  ) {
    throw new BadRequestError("End date must be after start date");
  }

  if (maxUsesPerUser !== undefined) coupon.maxUsesPerUser = maxUsesPerUser;
  if (maxUses !== undefined) coupon.maxUses = maxUses;
  if (allowedUser !== undefined) coupon.allowedUser = allowedUser;
  if (vendors !== undefined) coupon.vendors = vendors;

  await coupon.save();
  return sanitizeCoupon(coupon);
};

// Delete coupon
const deleteCoupon = async (coupon) => {
  await coupon.deleteOne();
  return sanitizeCoupon(coupon);
};

// Update coupon active status
const updateActive = async (coupon, isActive) => {
  if (coupon.isActive === isActive) {
    throw new ConflictError(
      "Coupon active status is already set to this value"
    );
  }

  coupon.isActive = isActive;
  await coupon.save();
  return sanitizeCoupon(coupon);
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  updateActive,
};
