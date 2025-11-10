const { UnauthorizedError } = require("../utils/errors");
const validKeys = {
  user: process.env.USER_APP_KEY,
  vendor: process.env.VENDOR_APP_KEY,
  admin: process.env.ADMIN_APP_KEY,
};

const checkApiKey = (allowedApp) => {
  return (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      throw new UnauthorizedError("API Key is required");
    }

    if (apiKey !== validKeys[allowedApp]) {
      console.log(apiKey, validKeys[allowedApp]);
      throw new UnauthorizedError("Invalid API Key for this app");
    }

    req.appType = allowedApp;

    next();
  };
};

module.exports = { checkApiKey };
