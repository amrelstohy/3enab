const swaggerJsdoc = require("swagger-jsdoc");
const redoc = require("redoc-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "3enab API Documentation",
      version: "1.0.0",
      description:
        "Full API documentation for Admin, Vendor, and User endpoints",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
      {
        url: process.env.BACKEND_URL + "/api/v1",
        description: "Production server",
      },
    ],
    tags: [
      // ADMIN
      {
        name: "Ads - Admin",
        description: "Admin endpoints for managing advertisements",
      },
      {
        name: "Items - Admin",
        description: "Admin endpoints for managing items",
      },
      {
        name: "Menu Categories - Admin",
        description: "Admin endpoints for managing menu categories",
      },
      {
        name: "Rates - Admin",
        description: "Admin endpoints for managing rates",
      },
      {
        name: "Users - Admin",
        description: "Admin endpoints for managing users",
      },
      {
        name: "Vendor Categories - Admin",
        description: "Admin endpoints for managing vendor categories",
      },
      {
        name: "Vendors - Admin",
        description: "Admin endpoints for managing vendors",
      },

      // VENDOR
      {
        name: "Items - Vendor",
        description: "Vendor endpoints for managing items",
      },
      {
        name: "Menu Categories - Vendor",
        description: "Vendor endpoints for managing menu categories",
      },
      {
        name: "Rates - Vendor",
        description: "Vendor endpoints for viewing rates",
      },
      {
        name: "Users - Vendor",
        description: "Vendor endpoints for managing profile",
      },
      {
        name: "Vendor Categories - Vendor",
        description: "Vendor endpoints for viewing vendor categories",
      },
      {
        name: "Vendors - Vendor",
        description: "Vendor endpoints for managing vendor profile",
      },

      // USER
      {
        name: "Ads - User",
        description: "Public user endpoints for viewing ads",
      },
      {
        name: "Items - User",
        description: "Public user endpoints for viewing items",
      },
      {
        name: "Menu Categories - User",
        description: "Public user endpoints for viewing menu categories",
      },
      {
        name: "Rates - User",
        description: "User endpoints for managing rates",
      },
      {
        name: "Users - User",
        description: "User endpoints for managing profile",
      },
      {
        name: "Vendor Categories - User",
        description: "Public user endpoints for viewing vendor categories",
      },
      {
        name: "Vendors - User",
        description: "Public user endpoints for viewing vendors",
      },

      // AUTH
      {
        name: "Authentication",
        description: "Authentication and authorization endpoints",
      },
    ],
  },
  apis: ["./features/**/*.routes.js", "./features/**/*.docs.js"],
};

const swaggerSpec = swaggerJsdoc(options);

// organize by tagGroups (Redoc only)
swaggerSpec["x-tagGroups"] = [
  {
    name: "👨‍💼 Admin Application",
    tags: [
      "Ads - Admin",
      "Items - Admin",
      "Menu Categories - Admin",
      "Rates - Admin",
      "Users - Admin",
      "Vendor Categories - Admin",
      "Vendors - Admin",
    ],
  },
  {
    name: "🏪 Vendor Application",
    tags: [
      "Items - Vendor",
      "Menu Categories - Vendor",
      "Rates - Vendor",
      "Users - Vendor",
      "Vendor Categories - Vendor",
      "Vendors - Vendor",
    ],
  },
  {
    name: "👤 User Application",
    tags: [
      "Ads - User",
      "Items - User",
      "Menu Categories - User",
      "Rates - User",
      "Users - User",
      "Vendor Categories - User",
      "Vendors - User",
    ],
  },
  {
    name: "🔐 Authentication",
    tags: ["Authentication"],
  },
];

function swaggerDocs(app) {
  // ✅ endpoint returning the JSON spec
  app.get("/docs-json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // ✅ Redoc documentation page
  app.get(
    "/docs",
    redoc({
      title: "3enab API Documentation",
      specUrl: "/docs-json",
    })
  );

  console.log("\n📘 API documentation running at:");
  console.log("👉 http://localhost:5000/docs");
}

module.exports = swaggerDocs;
