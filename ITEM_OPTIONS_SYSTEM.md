# نظام Options للمنتجات (Size/Weight)

## نظرة عامة

تم تحديث نظام Items لدعم الخيارات (Options) مثل الأحجام (Size) والأوزان (Weight) بشكل كامل في جميع أنحاء النظام.

## التعديلات الأساسية

### 1. Item Model

```javascript:52:113:features/items/item.model.js
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    optionType: {
      type: String,
      enum: ["none", "size", "weight"],  // ← جديد
      default: "none",
    },
    options: {
      type: [optionSchema],  // ← جديد
      default: [],
    },
    discount: {
      type: discountSchema,
      default: null,
    },
    imagePath: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: isActive,  // ← based on NODE_ENV
    },
    isAvailable: {
      type: Boolean,
      default: isAvailable,  // ← based on NODE_ENV
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
    prepTime: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
```

### Option Schema

```javascript:34:50:features/items/item.model.js
const optionSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);
```

### Method: getPrice(optionId)

```javascript:117:130:features/items/item.model.js
itemSchema.methods.getPrice = function (optionId = null) {
  const now = new Date();

  // no options
  if (this.optionType === "none") {
    return applyDiscount(this.basePrice, this.discount, now);
  }

  // with options → optionId is required
  const opt = this.options.id(optionId);
  if (!opt) return null;

  return applyDiscount(opt.price, this.discount, now);
};
```

---

## 2. Order Model

تم إضافة `optionId` و `optionValue` لـ orderItemSchema:

```javascript
const orderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    optionId: {
      // ← جديد
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    optionValue: {
      // ← جديد
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);
```

---

## 3. Sanitizers

### Item Sanitizer

```javascript
const sanitizeItem = (item) => {
  // ...
  return {
    _id: item._id,
    name: item.name,
    description: item.description,
    basePrice: item.basePrice,
    optionType: item.optionType, // ← جديد
    options: item.options || [], // ← جديد
    discount: item.discount,
    isActive: item.isActive,
    isAvailable: item.isAvailable,
    // ...
  };
};
```

### Order Item Sanitizer

```javascript
const sanitizeOrderItem = (orderItem) => {
  return {
    item: orderItem.item,
    optionId: orderItem.optionId || null, // ← جديد
    optionValue: orderItem.optionValue || null, // ← جديد
    quantity: orderItem.quantity,
    unitPrice: orderItem.unitPrice,
    totalPrice: orderItem.totalPrice,
  };
};
```

---

## 4. Total Price Calculator

تم تحديث `totalPriceCalc.js` لدعم Options بشكل كامل:

```javascript
// Create maps for easier lookup
const cartItemsMap = new Map(
  cartItems.map((cartItem) => [
    cartItem.item,
    {
      quantity: cartItem.quantity,
      optionId: cartItem.optionId || null, // ← جديد
    },
  ])
);

// ...

for (const item of items) {
  const cartItemData = cartItemsMap.get(item._id.toString());
  const optionId = cartItemData.optionId;

  // Get price using the item's getPrice method
  let unitPrice = item.getPrice(optionId); // ← استخدام صحيح

  // If unitPrice is null, it means invalid optionId
  if (unitPrice === null) {
    throw new BadRequestError(`Invalid option selected for item: ${item.name}`);
  }

  // Get option value if optionId exists
  let optionValue = null;
  if (optionId && item.options.length > 0) {
    const selectedOption = item.options.id(optionId);
    if (selectedOption) {
      optionValue = selectedOption.value; // ← حفظ القيمة
    }
  }

  result.items.push({
    item: item._id,
    optionId: optionId,
    optionValue: optionValue, // ← جديد
    quantity: cartItemData.quantity,
    unitPrice: unitPrice,
    totalPrice: totalPrice,
  });
}
```

---

## كيفية الاستخدام

### 1. إنشاء Item بدون Options

```json
POST /api/v1/vendor/items
{
  "name": "Burger",
  "description": "Classic beef burger",
  "basePrice": 50,
  "menuCategoryId": "...",
  "optionType": "none"
}
```

### 2. إنشاء Item مع Options (Size)

```json
POST /api/v1/vendor/items
{
  "name": "Pizza",
  "description": "Cheese pizza",
  "basePrice": 0,  // يتجاهل لو فيه options
  "menuCategoryId": "...",
  "optionType": "size",
  "options": [
    { "value": "Small", "price": 50, "order": 1 },
    { "value": "Medium", "price": 75, "order": 2 },
    { "value": "Large", "price": 100, "order": 3 }
  ]
}
```

### 3. إنشاء Item مع Options (Weight)

```json
POST /api/v1/vendor/items
{
  "name": "Grilled Chicken",
  "description": "Fresh grilled chicken",
  "basePrice": 0,
  "menuCategoryId": "...",
  "optionType": "weight",
  "options": [
    { "value": "250g", "price": 40, "order": 1 },
    { "value": "500g", "price": 75, "order": 2 },
    { "value": "1kg", "price": 140, "order": 3 }
  ]
}
```

### 4. إنشاء Order مع Options

```json
POST /api/v1/orders
{
  "cartItems": [
    {
      "item": "item_id_1",
      "quantity": 2
      // no optionId - للمنتجات بدون options
    },
    {
      "item": "item_id_2",
      "optionId": "option_id_large",  // ← جديد
      "quantity": 1
    }
  ],
  "addressId": "...",
  "paymentMethod": "cash"
}
```

### 5. Response مثال

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "orderNumber": 123,
    "items": [
      {
        "item": {
          "_id": "item_id_1",
          "name": "Burger",
          "imagePath": "..."
        },
        "optionId": null,
        "optionValue": null,
        "quantity": 2,
        "unitPrice": 50,
        "totalPrice": 100
      },
      {
        "item": {
          "_id": "item_id_2",
          "name": "Pizza",
          "imagePath": "..."
        },
        "optionId": "option_id_large",
        "optionValue": "Large", // ← القيمة المحفوظة
        "quantity": 1,
        "unitPrice": 100,
        "totalPrice": 100
      }
    ],
    "subtotal": 200,
    "deliveryFee": 15,
    "total": 215
  }
}
```

---

## Validation Rules

### 1. للمنتجات بدون Options (optionType = "none"):

- ✅ `basePrice` مطلوب
- ✅ `options` يجب أن يكون array فارغ
- ❌ `optionId` غير مطلوب في Order

### 2. للمنتجات مع Options (optionType = "size" أو "weight"):

- ✅ `options` يجب أن يحتوي على عنصر واحد على الأقل
- ✅ كل option يجب أن يحتوي على `value` و `price`
- ✅ `optionId` **مطلوب** في Order
- ❌ إذا تم إرسال `optionId` غير صحيح → Error: "Invalid option selected"

---

## Error Handling

```javascript
// Error 1: Option مطلوب ولم يتم إرساله
{
  "success": false,
  "message": "Invalid option selected for item: Pizza"
}

// Error 2: OptionId غير موجود
{
  "success": false,
  "message": "Invalid option selected for item: Pizza"
}
```

---

## Testing

### Test 1: منتج بدون Options

```bash
# Create item
POST /api/v1/vendor/items
{
  "name": "Burger",
  "basePrice": 50,
  "optionType": "none"
}

# Create order
POST /api/v1/orders
{
  "cartItems": [
    { "item": "burger_id", "quantity": 2 }
  ]
}

# Expected: unitPrice = 50, totalPrice = 100
```

### Test 2: منتج مع Options

```bash
# Create item with sizes
POST /api/v1/vendor/items
{
  "name": "Pizza",
  "optionType": "size",
  "options": [
    { "value": "Small", "price": 50 },
    { "value": "Large", "price": 100 }
  ]
}

# Create order with option
POST /api/v1/orders
{
  "cartItems": [
    {
      "item": "pizza_id",
      "optionId": "large_option_id",
      "quantity": 1
    }
  ]
}

# Expected: unitPrice = 100, optionValue = "Large"
```

### Test 3: Error - Option مفقود

```bash
POST /api/v1/orders
{
  "cartItems": [
    {
      "item": "pizza_id",  // has options
      "quantity": 1
      // missing optionId ❌
    }
  ]
}

# Expected: Error 400 - Invalid option selected
```

---

## الملفات المعدلة

1. ✅ `features/items/item.model.js` - دعم optionType و options
2. ✅ `features/items/item.sanitizers.js` - sanitize options
3. ✅ `features/items/item.service.js` - createItem و updateItem يدعموا options
4. ✅ `features/items/docs/item.vendor.docs.js` - Swagger docs للـ vendor
5. ✅ `features/items/docs/item.user.docs.js` - Swagger docs للـ user
6. ✅ `features/items/docs/item.admin.docs.js` - Swagger docs للـ admin
7. ✅ `features/orders/order.model.js` - إضافة optionId و optionValue
8. ✅ `features/orders/order.sanitizers.js` - sanitize optionId/Value
9. ✅ `utils/totalPriceCalc.js` - حساب السعر بناءً على optionId
10. ✅ `features/orders/docs/order.user.docs.js` - تحديث Swagger docs

---

## الخلاصة

النظام الآن يدعم بشكل كامل:

- ✅ منتجات بدون options (سعر واحد)
- ✅ منتجات مع options حسب الحجم (Small/Medium/Large)
- ✅ منتجات مع options حسب الوزن (250g/500g/1kg)
- ✅ حفظ option المختار في Order
- ✅ حساب السعر الصحيح بناءً على option
- ✅ Validation كامل لـ options

---

**تاريخ التحديث:** November 2025  
**الإصدار:** 2.0.0
