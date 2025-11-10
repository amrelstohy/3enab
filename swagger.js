const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// 🔥 Load all documentation files
require("./features/admin.docs");
require("./features/vendor.docs");
require("./features/user.docs");
require("./features/auth/auth.docs");

// Common configuration
const servers = [
  {
    url: "http://localhost:5000/",
    description: "Development server",
  },
  {
    url: process.env.BACKEND_URL,
    description: "Production server",
  },
];

const securitySchemes = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Enter JWT token",
  },
  apiKey: {
    type: "apiKey",
    in: "header",
    name: "x-api-key",
    description: "API Key for application authentication",
  },
};

// ============================================
// 👨‍💼 ADMIN DOCUMENTATION
// ============================================
const adminOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "👨‍💼 Admin Application",
      version: "1.0.0",
      description:
        "API endpoints for Admin application. Required: x-api-key header with ADMIN_APP_KEY",
    },
    servers: servers.map((s) => ({ ...s, url: s.url + "/admin" })),
    tags: [
      { name: "Ads - Admin", description: "Manage advertisements" },
      { name: "Coupons - Admin", description: "Manage coupons" },
      { name: "Delivery Areas - Admin", description: "Manage delivery areas" },
      { name: "Items - Admin", description: "Manage items" },
      {
        name: "Menu Categories - Admin",
        description: "Manage menu categories",
      },
      { name: "Rates - Admin", description: "Manage rates" },
      { name: "Users - Admin", description: "Manage users" },
      {
        name: "Vendor Categories - Admin",
        description: "Manage vendor categories",
      },
      { name: "Vendors - Admin", description: "Manage vendors" },
    ],
    components: { securitySchemes },
    security: [{ apiKey: [] }], // Global API key requirement
  },
  apis: ["./features/**/docs/*.admin.docs.js"],
};

// ============================================
// 🏪 VENDOR DOCUMENTATION
// ============================================
const vendorOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "🏪 Vendor Application",
      version: "1.0.0",
      description:
        "API endpoints for Vendor application. Required: x-api-key header with VENDOR_APP_KEY",
    },
    servers: servers.map((s) => ({ ...s, url: s.url + "/vendor" })),
    tags: [
      { name: "Items - Vendor", description: "Manage your items" },
      {
        name: "Menu Categories - Vendor",
        description: "Manage your menu categories",
      },
      { name: "Rates - Vendor", description: "View rates" },
      { name: "Users - Vendor", description: "Manage profile" },
      {
        name: "Vendor Categories - Vendor",
        description: "View vendor categories",
      },
      { name: "Vendors - Vendor", description: "Manage vendor profile" },
    ],
    components: { securitySchemes },
    security: [{ apiKey: [] }], // Global API key requirement
  },
  apis: ["./features/**/docs/*.vendor.docs.js"],
};

// ============================================
// 👤 USER DOCUMENTATION
// ============================================
const userOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "👤 User Application",
      version: "1.0.0",
      description:
        "API endpoints for User application. Required: x-api-key header with USER_APP_KEY",
    },
    servers: servers,
    tags: [
      { name: "Addresses - User", description: "Manage delivery addresses" },
      { name: "Ads - User", description: "View advertisements" },
      { name: "Coupons - User", description: "View available coupons" },
      {
        name: "Delivery Areas - User",
        description: "View available delivery areas",
      },
      { name: "Items - User", description: "Browse items" },
      { name: "Menu Categories - User", description: "Browse menu categories" },
      { name: "Orders - User", description: "Manage your orders" },
      { name: "Rates - User", description: "Manage your rates" },
      { name: "Users - User", description: "Manage your profile" },
      {
        name: "Vendor Categories - User",
        description: "Browse vendor categories",
      },
      { name: "Vendors - User", description: "Browse vendors" },
    ],
    components: { securitySchemes },
    security: [{ apiKey: [] }], // Global API key requirement
  },
  apis: ["./features/**/docs/*.user.docs.js"],
};

// ============================================
// 🔐 AUTHENTICATION DOCUMENTATION
// ============================================
const authOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "🔐 Authentication",
      version: "1.0.0",
      description:
        "Authentication and authorization endpoints. Available on all 3 applications with their respective API keys.\n\n" +
        "**Available Endpoints:**\n" +
        "- `/api/v1/auth/*` - User App (x-api-key: USER_APP_KEY)\n" +
        "- `/api/v1/admin/auth/*` - Admin App (x-api-key: ADMIN_APP_KEY)\n" +
        "- `/api/v1/vendor/auth/*` - Vendor App (x-api-key: VENDOR_APP_KEY)",
    },
    servers: [
      {
        url: servers[0].url + "api/v1",
        description: "User Application (Development)",
      },
      {
        url: servers[0].url + "api/v1/admin",
        description: "Admin Application (Development)",
      },
      {
        url: servers[0].url + "api/v1/vendor",
        description: "Vendor Application (Development)",
      },
      {
        url: servers[1].url + "api/v1",
        description: "User Application (Production)",
      },
      {
        url: servers[1].url + "api/v1/admin",
        description: "Admin Application (Production)",
      },
      {
        url: servers[1].url + "api/v1/vendor",
        description: "Vendor Application (Production)",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Login, register, and manage authentication",
      },
    ],
    components: { securitySchemes },
    security: [{ apiKey: [] }], // Global API key requirement
  },
  apis: ["./features/auth/*.js"],
};

// Generate specs
const adminSpec = swaggerJsdoc(adminOptions);
const vendorSpec = swaggerJsdoc(vendorOptions);
const userSpec = swaggerJsdoc(userOptions);
const authSpec = swaggerJsdoc(authOptions);

// Common Swagger UI options
const swaggerUiOptions = {
  explorer: false,
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 20px 0 }
    .swagger-ui .scheme-container { margin: 20px 0 }
    .swagger-ui .information-container { margin-bottom: 20px; }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: "list",
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
};

function swaggerDocs(app) {
  // 👨‍💼 Admin Documentation
  app.use(
    "/docs/admin",
    swaggerUi.serveFiles(adminSpec),
    swaggerUi.setup(adminSpec, swaggerUiOptions)
  );

  // 🏪 Vendor Documentation
  app.use(
    "/docs/vendor",
    swaggerUi.serveFiles(vendorSpec),
    swaggerUi.setup(vendorSpec, swaggerUiOptions)
  );

  // 👤 User Documentation
  app.use(
    "/docs/user",
    swaggerUi.serveFiles(userSpec),
    swaggerUi.setup(userSpec, swaggerUiOptions)
  );

  // 🔐 Authentication Documentation
  app.use(
    "/docs/auth",
    swaggerUi.serveFiles(authSpec),
    swaggerUi.setup(authSpec, swaggerUiOptions)
  );

  // JSON specs endpoints
  app.get("/docs-json/admin", (req, res) => res.json(adminSpec));
  app.get("/docs-json/vendor", (req, res) => res.json(vendorSpec));
  app.get("/docs-json/user", (req, res) => res.json(userSpec));
  app.get("/docs-json/auth", (req, res) => res.json(authSpec));

  // Main documentation page with links
  app.get("/docs", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>3enab API Documentation</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 50px;
            max-width: 800px;
            width: 100%;
          }
          h1 {
            color: #2d3748;
            font-size: 2.5rem;
            margin-bottom: 15px;
            text-align: center;
          }
          .subtitle {
            color: #718096;
            text-align: center;
            margin-bottom: 40px;
            font-size: 1.1rem;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            text-decoration: none;
            color: white;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .card-icon {
            font-size: 3rem;
            margin-bottom: 15px;
          }
          .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .card-desc {
            font-size: 0.9rem;
            opacity: 0.9;
          }
          .card.admin { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
          .card.vendor { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
          .card.user { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
          .card.auth { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
          .footer {
            text-align: center;
            color: #a0aec0;
            font-size: 0.9rem;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🍇 3enab API Documentation</h1>
          <p class="subtitle">Choose your application to view the documentation</p>
          
          <div class="grid">
            <a href="/docs/admin" class="card admin">
              <div class="card-icon">👨‍💼</div>
              <div class="card-title">Admin</div>
              <div class="card-desc">Admin application endpoints</div>
            </a>
            
            <a href="/docs/vendor" class="card vendor">
              <div class="card-icon">🏪</div>
              <div class="card-title">Vendor</div>
              <div class="card-desc">Vendor application endpoints</div>
            </a>
            
            <a href="/docs/user" class="card user">
              <div class="card-icon">👤</div>
              <div class="card-title">User</div>
              <div class="card-desc">User application endpoints</div>
            </a>
            
            <a href="/docs/auth" class="card auth">
              <div class="card-icon">🔐</div>
              <div class="card-title">Authentication</div>
              <div class="card-desc">Login & register endpoints</div>
            </a>
          </div>
          
          <div class="footer">
            Made with ❤️ for 3enab Project
          </div>
        </div>
      </body>
      </html>
    `);
  });

  console.log("\n📚 API Documentation Available:");
  console.log("   🏠 Main Page:     http://localhost:5000/docs");
  console.log("   👨‍💼 Admin Docs:   http://localhost:5000/docs/admin");
  console.log("   🏪 Vendor Docs:  http://localhost:5000/docs/vendor");
  console.log("   👤 User Docs:    http://localhost:5000/docs/user");
  console.log("   🔐 Auth Docs:    http://localhost:5000/docs/auth\n");
}

module.exports = swaggerDocs;
