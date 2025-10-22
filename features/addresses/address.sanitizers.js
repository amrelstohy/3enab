const sanitizeAddress = (address) => {
  return {
    _id: address._id.toString(),
    name: address.name,
    fullAddress: address.fullAddress,
    latitude: address.location.coordinates[1],
    longitude: address.location.coordinates[0],
    isDefault: address.isDefault,
    notes: address.notes,
    createdAt: address.createdAt,
    updatedAt: address.updatedAt,
  };
};

const sanitizeAddresses = (addresses) => {
  return addresses.map(sanitizeAddress);
};

module.exports = { sanitizeAddress, sanitizeAddresses };
