const addressService = require("./address.service");

// Create address
const createAddress = async (req, res) => {
  const address = await addressService.createAddress(req.user, req.body);
  res.status(201).json({
    status: "success",
    message: "Address created successfully",
    data: { address },
  });
};

// Get all addresses for current user
const getAddresses = async (req, res) => {
  const addresses = await addressService.getAddresses(req.user);
  res.status(200).json({
    status: "success",
    message: "Addresses fetched successfully",
    data: { addresses },
  });
};

// Get address by id
const getAddressById = async (req, res) => {
  const { id } = req.params;
  const address = await addressService.getAddressById(req.user, id);
  res.status(200).json({
    status: "success",
    message: "Address fetched successfully",
    data: { address },
  });
};

// Get default address
const getDefaultAddress = async (req, res) => {
  const address = await addressService.getDefaultAddress(req.user);
  res.status(200).json({
    status: "success",
    message: "Default address fetched successfully",
    data: { address },
  });
};

// Update address
const updateAddress = async (req, res) => {
  const { id } = req.params;
  const address = await addressService.updateAddress(id, req.body, req.user);
  res.status(200).json({
    status: "success",
    message: "Address updated successfully",
    data: { address },
  });
};

// Delete address
const deleteAddress = async (req, res) => {
  const { id } = req.params;
  await addressService.deleteAddress(req.user, id);
  res.status(200).json({
    status: "success",
    message: "Address deleted successfully",
  });
};

// Set default address
const setDefaultAddress = async (req, res) => {
  const { id } = req.params;
  const address = await addressService.setDefaultAddress(id, req.user);
  res.status(200).json({
    status: "success",
    message: "Address set as default successfully",
    data: { address },
  });
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  getDefaultAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
