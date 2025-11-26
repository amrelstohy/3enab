const Item = require("./item.model");
const { NotFoundError, ConflictError } = require("../../utils/errors");
const { sanitizeItem, sanitizeItems } = require("./item.sanitizers");
const { removeImage } = require("../../utils/image");
const path = require("path");

// Create item
const createItem = async (itemData, menuCategoryId, vendorId) => {
  const { name, description, basePrice, prepTime, optionType, options } =
    itemData;

  const itemNum = await Item.countDocuments({ category: menuCategoryId });

  const item = new Item({
    name,
    description,
    basePrice,
    optionType: optionType || "none",
    options: options || [],
    category: menuCategoryId,
    order: itemNum + 1,
    prepTime,
    vendor: vendorId,
  });

  await item.save();
  return sanitizeItem(item);
};

// Upload item image
const uploadItemImage = async (item, file) => {
  item.imagePath = file.webPath || null;
  item.markModified("imagePath");
  await item.save();
  return sanitizeItem(item);
};

// Get item image
const getItemImage = async (item) => {
  if (!item.imagePath) {
    throw new NotFoundError("this item has no image");
  }
  return path.join(__dirname, "..", "..", item.imagePath);
};

// Update item
const updateItem = async (item, updateData) => {
  const { name, description, basePrice, prepTime, optionType, options } =
    updateData;

  item.name = name;
  item.description = description;
  item.basePrice = basePrice;
  item.prepTime = prepTime;

  // Update optionType and options if provided
  if (optionType !== undefined) {
    item.optionType = optionType;
  }
  if (options !== undefined) {
    item.options = options;
  }

  await item.save();
  return sanitizeItem(item);
};

// Delete item
const deleteItem = async (item) => {
  if (item.imagePath) {
    await removeImage(item.imagePath);
  }
  await item.deleteOne();
};

// Get all items
const getItems = async (params) => {
  const menuCategoryId = params.menuCategoryId;

  const items = await Item.find({
    category: menuCategoryId,
    isActive: true,
  }).lean();

  return sanitizeItems(items);
};

// Get item by id
const getItemById = async (item) => {
  return sanitizeItem(item);
};

// Update order
const updateOrder = async (menuCategory, orderedArray) => {
  const allItems = await Item.find({
    category: menuCategory._id,
  }).select("_id");

  const allIds = allItems.map((item) => item._id.toString());

  const missingIds = allIds.filter((id) => !orderedArray.includes(id));

  if (missingIds.length > 0) {
    throw new NotFoundError(`Missing items: ${missingIds.join(", ")}`);
  }

  await Item.bulkWrite(
    orderedArray.map((id, index) => ({
      updateOne: {
        filter: { _id: id, category: menuCategory._id },
        update: { order: index + 1 },
      },
    }))
  );

  const updated = await Item.find({ category: menuCategory._id }).sort("order");
  return sanitizeItems(updated);
};

// Update item availability
const updateAvailability = async (item, isAvailable) => {
  if (item.isAvailable === isAvailable) {
    throw new ConflictError("Item availability is already set to this value");
  }
  item.isAvailable = isAvailable;
  await item.save();
  return sanitizeItem(item);
};

// Update item active status
const updateActive = async (item, isActive) => {
  if (item.isActive === isActive) {
    throw new ConflictError("Item active status is already set to this value");
  }
  item.isActive = isActive;
  await item.save();
  return sanitizeItem(item);
};

// Update item discount
const updateDiscount = async (item, discountData) => {
  const { type, value, startDate, endDate, isActive } = discountData;

  item.discount.type = type;
  item.discount.value = value;
  item.discount.startDate = startDate;
  item.discount.endDate = endDate;
  item.discount.isActive = isActive;

  await item.save();
  return sanitizeItem(item);
};

// Remove item discount
const removeDiscount = async (item) => {
  item.discount = null;
  await item.save();
  return sanitizeItem(item);
};

// Get all items for admin
const getAllItemsForAdmin = async (params) => {
  const menuCategoryId = params.menuCategoryId;

  const items = await Item.find({
    category: menuCategoryId,
  }).lean();

  return sanitizeItems(items);
};

module.exports = {
  createItem,
  uploadItemImage,
  getItemImage,
  updateItem,
  deleteItem,
  getItems,
  getItemById,
  updateOrder,
  updateAvailability,
  updateActive,
  updateDiscount,
  removeDiscount,
  getAllItemsForAdmin,
};
