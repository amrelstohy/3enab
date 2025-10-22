const sanitizeRate = (rate) => {
  return {
    _id: rate._id,
    vendor: rate.vendor,
    user: rate.user,
    rate: rate.rate,
    comment: rate.comment,
    createdAt: rate.createdAt,
    updatedAt: rate.updatedAt,
  };
};

const sanitizeRates = (rates) => {
  return rates.map((rate) => sanitizeRate(rate));
};

module.exports = { sanitizeRate, sanitizeRates };
