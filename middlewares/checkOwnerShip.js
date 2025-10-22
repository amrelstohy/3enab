const { UnauthorizedError } = require("../utils/errors");

const checkOwnerShip = (Model, field = "owner") => {
  return async (req, res, next) => {
    if (
      req[Model.modelName.toLowerCase()][field].toString() !== req.user.id &&
      !req.user.isAdmin
    ) {
      throw new UnauthorizedError(
        `You are not authorized to access this ${Model.modelName}`
      );
    }
    next();
  };
};

module.exports = checkOwnerShip;
