const { UnauthorizedError } = require("../utils/errors");
const jwt = require("jsonwebtoken");
const User = require("../features/users/user.model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Missing token");
  }

  let userId;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  req.user = user;

  next();
};

module.exports = authMiddleware;
