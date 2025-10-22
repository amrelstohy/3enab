const rateLimit = require("express-rate-limit");

const limiter = (minutes, limit, message) =>
  rateLimit({
    windowMs: minutes * 60 * 1000,
    limit: limit,
    message: message || "Too many requests, please try again later.",
  });

module.exports = limiter;
