const Rate = require("./rate.model");
const Vendor = require("../vendors/vendor.model");
const { NotFoundError, ConflictError } = require("../../utils/errors");
const { sanitizeRate, sanitizeRates } = require("./rate.sanitizers");

// Create rate
const createRate = async (user, rateData, vendorId) => {
  const { rate, comment } = rateData;

  const vendorExists = await Vendor.findById(vendorId);
  if (!vendorExists) {
    throw new NotFoundError("Vendor not found");
  }

  const existingRate = await Rate.findOne({ vendor: vendorId, user: user._id });
  if (existingRate) {
    throw new ConflictError("You have already rated this vendor");
  }

  const newRate = new Rate({
    vendor: vendorId,
    user: user._id,
    rate,
    comment,
  });

  await newRate.save();
  return sanitizeRate(newRate);
};

// Get rates
const getRates = async (query, vendorId) => {
  const orderBy = query.orderBy || "createdAt";
  const order = query.order || "desc";
  const page = query.page || 1;
  const limit = query.limit || 10;

  const sortOrder = order === "desc" ? -1 : 1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [rates, total] = await Promise.all([
    Rate.find({ vendor: vendorId })
      .populate("user", "name")
      .sort({
        [orderBy]: sortOrder,
      })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Rate.countDocuments({ vendor: vendorId }),
  ]);

  return {
    rates: sanitizeRates(rates),
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
};

// Get rate by id
const getRateById = async (rateId, vendorId) => {
  const rate = await Rate.findOne({ _id: rateId, vendor: vendorId })
    .populate("user", "name")
    .lean();
  if (!rate) {
    throw new NotFoundError("Rate not found");
  }

  return sanitizeRate(rate);
};

// Update rate
const updateRate = async (rate, updateData) => {
  const { newRate, comment } = updateData;

  rate.rate = newRate;
  rate.comment = comment ? comment : null;

  await rate.save();
  return sanitizeRate(rate);
};

// Delete rate
const deleteRate = async (rate) => {
  await rate.deleteOne();
};

module.exports = {
  createRate,
  getRates,
  getRateById,
  updateRate,
  deleteRate,
};
