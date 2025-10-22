const rateService = require("./rate.service");

// create rate
const createRate = async (req, res) => {
  const rate = await rateService.createRate(
    req.user,
    req.body,
    req.params.vendorId
  );
  res.status(201).json({
    status: "success",
    message: "Rate created successfully",
    data: { rate },
  });
};

// get rates
const getRates = async (req, res) => {
  const data = await rateService.getRates(req.query, req.params.vendorId);
  res.status(200).json({
    status: "success",
    message: "Rates fetched successfully",
    data,
  });
};

// get rate by id
const getRateById = async (req, res) => {
  const { rateId } = req.params;
  const rate = await rateService.getRateById(rateId, req.params.vendorId);
  res.status(200).json({
    status: "success",
    message: "Rate fetched successfully",
    data: { rate },
  });
};

// update rate
const updateRate = async (req, res) => {
  const rate = await rateService.updateRate(
    req.rate,
    req.body,
    req.params.vendorId
  );
  res.status(200).json({
    status: "success",
    message: "Rate updated successfully",
    data: { rate },
  });
};

// delete rate
const deleteRate = async (req, res) => {
  await rateService.deleteRate(req.rate);
  res.status(200).json({
    status: "success",
    message: "Rate deleted successfully",
  });
};

module.exports = {
  createRate,
  getRates,
  getRateById,
  updateRate,
  deleteRate,
};
