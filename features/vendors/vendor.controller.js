const vendorService = require("./vendor.service");

// create vendor
const createVendor = async (req, res) => {
  const vendor = await vendorService.createVendor(req.user, req.body);
  res.status(201).json({
    status: "success",
    message: "Vendor created successfully",
    data: { vendor },
  });
};

// update vendor
const updateVendor = async (req, res) => {
  const vendor = await vendorService.updateVendor(req.vendor, req.body);
  res.status(200).json({
    status: "success",
    message: "Vendor updated successfully",
    data: { vendor },
  });
};

// upload logo
const uploadLogo = async (req, res) => {
  const vendor = await vendorService.uploadLogo(req.vendor, req.file);
  res.status(200).json({
    status: "success",
    message: "Logo uploaded successfully",
    data: { vendor },
  });
};

// get logo
const getLogo = async (req, res) => {
  const { vendorId } = req.params;
  const logoPath = await vendorService.getLogo(vendorId);
  console.log(logoPath);
  res.status(200).sendFile(logoPath, (err) => {
    if (err) {
      throw new NotFoundError("Logo not found");
    }
  });
};

// delete vendor
const deleteVendor = async (req, res) => {
  await vendorService.deleteVendor(req.vendor);
  res.status(200).json({
    status: "success",
    message: "Vendor deleted successfully",
  });
};

// get vendors
const getVendors = async (req, res) => {
  const data = await vendorService.getVendors(req.query);
  res.status(200).json({
    status: "success",
    message: "Vendors fetched successfully",
    data,
  });
};

// get vendor by id
const getVendorById = async (req, res) => {
  const { vendorId } = req.params;
  const vendor = await vendorService.getVendorById(vendorId);
  res.status(200).json({
    status: "success",
    message: "Vendor fetched successfully",
    data: { vendor },
  });
};

// update active status
const updateActive = async (req, res) => {
  const vendor = await vendorService.updateActive(
    req.vendor,
    req.body.isActive
  );
  res.status(200).json({
    status: "success",
    message: "Vendor active status updated successfully",
    data: { vendor },
  });
};

// Get all vendors for admin
const getAllVendorsForAdmin = async (req, res) => {
  const data = await vendorService.getAllVendorsForAdmin(req.query);
  res.status(200).json({
    status: "success",
    message: "Vendors fetched successfully",
    data,
  });
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
  getAllVendorsForAdmin,
};
