const Item = require("./item.model");
const { NotFoundError } = require("../../utils/errors");
const { sanitizeItem, sanitizeItems } = require("./item.sanitizers");
const { removeImage } = require("../../utils/image");
const path = require("path");

// Create item
const createItem = async (itemData, category) => {
  const { name, description, basePrice, prepTime } = itemData;

  const itemNum = await Item.countDocuments({ category });

  const item = new Item({
    name,
    description,
    basePrice,
    category: category._id,
    order: itemNum + 1,
    prepTime,
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
  const { name, description, basePrice, prepTime } = updateData;

  item.name = name;
  item.description = description;
  item.basePrice = basePrice;
  item.prepTime = prepTime;
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
  const categoryId = params.categoryId;

  const items = await Item.find({
    category: categoryId,
    status: { $ne: "inactive" },
  }).lean();

  return sanitizeItems(items);
};

// Get item by id
const getItemById = async (item) => {
  return sanitizeItem(item);
};

// Update order
const updateOrder = async (category, orderedArray) => {
  const allItems = await Item.find({
    category: category._id,
  }).select("_id");

  const allIds = allItems.map((item) => item._id.toString());

  const missingIds = allIds.filter((id) => !orderedArray.includes(id));

  if (missingIds.length > 0) {
    throw new NotFoundError(`Missing items: ${missingIds.join(", ")}`);
  }

  await Item.bulkWrite(
    orderedArray.map((id, index) => ({
      updateOne: {
        filter: { _id: id, category: category._id },
        update: { order: index + 1 },
      },
    }))
  );

  const updated = await Item.find({ category: category._id }).sort("order");
  return sanitizeItems(updated);
};

// Update item status
const updateStatus = async (item, updateData) => {
  const { status } = updateData;
  item.status = status;
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

module.exports = {
  createItem,
  uploadItemImage,
  getItemImage,
  updateItem,
  deleteItem,
  getItems,
  getItemById,
  updateOrder,
  updateStatus,
  updateDiscount,
  removeDiscount,
};
