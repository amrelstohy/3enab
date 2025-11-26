# دليل سريع - نظام Options للمنتجات

## 🎯 إنشاء منتج بدون Options

### Request:
```json
POST /api/v1/vendor/items?vendorId=XXX&menuCategoryId=YYY
{
  "name": "برجر كلاسيك",
  "description": "برجر لحم طازج مع الخس والطماطم",
  "basePrice": 50,
  "prepTime": "15 دقيقة",
  "optionType": "none"
}
```

### Response:
```json
{
  "status": "success",
  "message": "Item created successfully",
  "data": {
    "item": {
      "_id": "...",
      "name": "برجر كلاسيك",
      "basePrice": 50,
      "optionType": "none",
      "options": []
    }
  }
}
```

---

## 🍕 إنشاء منتج مع Options (أحجام)

### Request:
```json
POST /api/v1/vendor/items?vendorId=XXX&menuCategoryId=YYY
{
  "name": "بيتزا مارجريتا",
  "description": "بيتزا جبن طازجة",
  "basePrice": 0,
  "prepTime": "20-25 دقيقة",
  "optionType": "size",
  "options": [
    { "value": "صغير", "price": 40, "order": 1 },
    { "value": "وسط", "price": 60, "order": 2 },
    { "value": "كبير", "price": 85, "order": 3 },
    { "value": "عائلي", "price": 120, "order": 4 }
  ]
}
```

### Response:
```json
{
  "status": "success",
  "data": {
    "item": {
      "_id": "abc123",
      "name": "بيتزا مارجريتا",
      "optionType": "size",
      "options": [
        {
          "_id": "opt1",
          "value": "صغير",
          "price": 40,
          "order": 1
        },
        {
          "_id": "opt2",
          "value": "وسط",
          "price": 60,
          "order": 2
        },
        {
          "_id": "opt3",
          "value": "كبير",
          "price": 85,
          "order": 3
        },
        {
          "_id": "opt4",
          "value": "عائلي",
          "price": 120,
          "order": 4
        }
      ]
    }
  }
}
```

---

## 🍗 إنشاء منتج مع Options (أوزان)

### Request:
```json
POST /api/v1/vendor/items?vendorId=XXX&menuCategoryId=YYY
{
  "name": "فراخ مشوية",
  "description": "فراخ طازجة مشوية على الفحم",
  "basePrice": 0,
  "prepTime": "30 دقيقة",
  "optionType": "weight",
  "options": [
    { "value": "ربع كيلو", "price": 35, "order": 1 },
    { "value": "نص كيلو", "price": 65, "order": 2 },
    { "value": "كيلو", "price": 120, "order": 3 },
    { "value": "كيلو ونص", "price": 175, "order": 4 }
  ]
}
```

---

## 🛒 إنشاء Order مع Options

### Request:
```json
POST /api/v1/orders
{
  "cartItems": [
    {
      "item": "burger_id",
      "quantity": 2
      // لا يحتاج optionId - منتج عادي
    },
    {
      "item": "pizza_id",
      "optionId": "opt3",  // ← ID للحجم الكبير
      "quantity": 1
    },
    {
      "item": "chicken_id",
      "optionId": "opt2",  // ← ID لنص كيلو
      "quantity": 1
    }
  ],
  "addressId": "address_id",
  "paymentMethod": "cash"
}
```

### Response:
```json
{
  "success": true,
  "data": {
    "orderNumber": 123,
    "items": [
      {
        "item": { "_id": "burger_id", "name": "برجر كلاسيك" },
        "optionId": null,
        "optionValue": null,
        "quantity": 2,
        "unitPrice": 50,
        "totalPrice": 100
      },
      {
        "item": { "_id": "pizza_id", "name": "بيتزا مارجريتا" },
        "optionId": "opt3",
        "optionValue": "كبير",  // ← القيمة محفوظة
        "quantity": 1,
        "unitPrice": 85,
        "totalPrice": 85
      },
      {
        "item": { "_id": "chicken_id", "name": "فراخ مشوية" },
        "optionId": "opt2",
        "optionValue": "نص كيلو",  // ← القيمة محفوظة
        "quantity": 1,
        "unitPrice": 65,
        "totalPrice": 65
      }
    ],
    "subtotal": 250,
    "deliveryFee": 15,
    "total": 265
  }
}
```

---

## 📝 تحديث منتج

### إضافة Options لمنتج موجود:
```json
PATCH /api/v1/vendor/items/:itemId
{
  "optionType": "size",
  "options": [
    { "value": "صغير", "price": 30, "order": 1 },
    { "value": "كبير", "price": 50, "order": 2 }
  ]
}
```

### تعديل Options موجودة:
```json
PATCH /api/v1/vendor/items/:itemId
{
  "options": [
    { "value": "صغير", "price": 35, "order": 1 },  // سعر جديد
    { "value": "وسط", "price": 55, "order": 2 },   // إضافة حجم جديد
    { "value": "كبير", "price": 75, "order": 3 }
  ]
}
```

### إزالة Options وعودة للسعر الواحد:
```json
PATCH /api/v1/vendor/items/:itemId
{
  "optionType": "none",
  "options": [],
  "basePrice": 60
}
```

---

## ⚠️ أخطاء شائعة

### ❌ Error 1: Option مطلوب لكن غير موجود
```json
// Request
{
  "cartItems": [
    {
      "item": "pizza_id",  // has options
      "quantity": 1
      // missing optionId ❌
    }
  ]
}

// Response
{
  "success": false,
  "message": "Invalid option selected for item: بيتزا مارجريتا"
}
```

### ❌ Error 2: OptionId غير صحيح
```json
// Request
{
  "cartItems": [
    {
      "item": "pizza_id",
      "optionId": "wrong_id",  // ❌ غير موجود
      "quantity": 1
    }
  ]
}

// Response
{
  "success": false,
  "message": "Invalid option selected for item: بيتزا مارجريتا"
}
```

---

## 💡 نصائح

### 1. عند إنشاء منتج مع Options:
- ✅ `optionType` يجب أن يكون "size" أو "weight"
- ✅ `options` array يجب أن يحتوي على option واحد على الأقل
- ✅ كل option يجب أن يحتوي على `value` و `price`
- ⚠️ `basePrice` سيتجاهل (يُستخدم فقط مع optionType: "none")

### 2. عند إنشاء Order:
- ✅ للمنتجات بدون options: لا ترسل `optionId`
- ✅ للمنتجات مع options: **لازم** ترسل `optionId`
- ✅ النظام سيحفظ `optionValue` تلقائياً في Order

### 3. عرض المنتج للمستخدم:
```javascript
if (item.optionType === "none") {
  // عرض سعر واحد
  displayPrice(item.basePrice);
} else {
  // عرض قائمة Options للاختيار
  item.options.forEach(option => {
    displayOption(option.value, option.price);
  });
}
```

---

## 📦 أمثلة حقيقية

### مطعم برجر:
```json
{
  "name": "تشيز برجر",
  "optionType": "size",
  "options": [
    { "value": "سينجل", "price": 45 },
    { "value": "دبل", "price": 75 },
    { "value": "تريبل", "price": 100 }
  ]
}
```

### محل فراخ:
```json
{
  "name": "فراخ بانيه",
  "optionType": "weight",
  "options": [
    { "value": "2 قطعة", "price": 30 },
    { "value": "4 قطع", "price": 55 },
    { "value": "6 قطع", "price": 80 }
  ]
}
```

### مطعم مشروبات:
```json
{
  "name": "عصير برتقال",
  "optionType": "size",
  "options": [
    { "value": "صغير (250ml)", "price": 15 },
    { "value": "وسط (500ml)", "price": 25 },
    { "value": "كبير (1L)", "price": 40 }
  ]
}
```

---

## 🎯 الخلاصة

- ✅ **optionType = "none"** → سعر واحد (basePrice)
- ✅ **optionType = "size"** → أحجام مختلفة (صغير، وسط، كبير)
- ✅ **optionType = "weight"** → أوزان مختلفة (250g، 500g، 1kg)
- ✅ **في Order** → لازم ترسل optionId للمنتجات اللي فيها options
- ✅ **النظام** → يحفظ optionValue تلقائياً في Order

---

**راجع `ITEM_OPTIONS_SYSTEM.md` للتفاصيل الكاملة! 📖**

