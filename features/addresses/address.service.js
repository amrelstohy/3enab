const Address = require("./address.model");
const {
  NotFoundError,
  NotAuthorizedError,
  ConflictError,
} = require("../../utils/errors");
const { sanitizeAddress, sanitizeAddresses } = require("./address.sanitizers");

// Create a new address for a user
const createAddress = async (user, addressData) => {
  const { name, fullAddress, latitude, longitude, isDefault, notes } =
    addressData;

  const address = new Address({
    user: user._id,
    name,
    fullAddress,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    isDefault,
    notes,
  });

  await address.save();

  if (isDefault) {
    await Address.updateMany(
      { user: user._id, _id: { $ne: address._id } },
      { $set: { isDefault: false } }
    );
  }

  return sanitizeAddress(address);
};

// Get all addresses for a user
const getAddresses = async (user) => {
  const addresses = await Address.find({ user: user._id }).sort({
    createdAt: -1,
  });
  return sanitizeAddresses(addresses);
};

// Get address by id for a user
const getAddressById = async (user, id) => {
  console.log(user.id);
  const address = await Address.findById(id);

  if (!address) {
    throw new NotFoundError("Address not found");
  }

  if (address.user.toString() !== user.id) {
    throw new NotAuthorizedError(
      "You are not authorized to access this address"
    );
  }

  return sanitizeAddress(address);
};

// Get default address for a user
const getDefaultAddress = async (user) => {
  const address = await Address.findOne({ user: user.id, isDefault: true });

  if (!address) {
    throw new NotFoundError("Default address not found");
  }

  return sanitizeAddress(address);
};

// Update address for a user
const updateAddress = async (id, addressData, user) => {
  const { name, fullAddress, latitude, longitude, isDefault, notes } =
    addressData;

  const address = await Address.findById(id);

  if (!address) {
    throw new NotFoundError("Address not found");
  }

  if (address.user.toString() !== user.id) {
    throw new NotAuthorizedError(
      "You are not authorized to update this address"
    );
  }

  address.name = name;
  address.fullAddress = fullAddress;
  address.location.coordinates = [longitude, latitude];
  address.isDefault = isDefault;
  address.notes = notes;
  await address.save();

  if (isDefault) {
    await Address.updateMany(
      { user: address.user, _id: { $ne: address._id } },
      { $set: { isDefault: false } }
    );
  }

  return sanitizeAddress(address);
};

// Delete address for a user
const deleteAddress = async (user, id) => {
  const address = await Address.findById(id);

  if (!address) {
    throw new NotFoundError("Address not found");
  }

  if (address.user.toString() !== user.id) {
    throw new NotAuthorizedError(
      "You are not authorized to delete this address"
    );
  }

  await address.deleteOne();
};

// Set default address for a user
const setDefaultAddress = async (id, user) => {
  const address = await Address.findById(id);

  if (!address) {
    throw new NotFoundError("Address not found");
  }

  if (address.user.toString() !== user.id) {
    throw new NotAuthorizedError(
      "You are not authorized to set this address as default"
    );
  }

  if (address.isDefault) {
    throw new ConflictError("Address is already default");
  }

  address.isDefault = true;
  await address.save();

  await Address.updateMany(
    { user: address.user, _id: { $ne: address._id } },
    { $set: { isDefault: false } }
  );

  return sanitizeAddress(address);
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
