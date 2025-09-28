const { UnauthorizedError, NotFoundError } = require("../utils/errors");
const jwt = require("jsonwebtoken");
const User = require("../features/users/user.model");
require("dotenv").config();

const resetPassMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Missing token");
  }

  let userId;

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!user.resetPasswordTokenExpires) {
    throw new UnauthorizedError("Token expired");
  }
  req.user = user;

  next();
};

module.exports = resetPassMiddleware;
