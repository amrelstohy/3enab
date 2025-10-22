const { NotFoundError } = require("../utils/errors");

const isResourceExists = (Model, idParam) => {
  return async (req, res, next) => {
    const resource = await Model.findById(req.params[idParam]);
    if (!resource) {
      throw new NotFoundError(`${Model.modelName} not found`);
    }
    req[Model.modelName[0].toLowerCase() + Model.modelName.slice(1)] = resource;
    next();
  };
};

module.exports = isResourceExists;
