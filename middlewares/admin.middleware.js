const { UnauthorizedError } = require("../utils/errors");

const adminMiddleware = async (req, res, next) => {
  if (req.user.type !== "admin") {
    throw new UnauthorizedError(
      "You are not authorized to access this resource"
    );
  }
  next();
};

module.exports = adminMiddleware;
