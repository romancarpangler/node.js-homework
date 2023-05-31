const mongoose = require("mongoose");

const { httpError } = require("../helpers/httpsError");

const validId = (req, res, next) => {
  const { id } = req.params;
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) {
    throw httpError(404, "Not found, invalid id");
  }
  next();
};

module.exports = { validId };
