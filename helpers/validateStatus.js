const Joi = require("joi");

const { httpError } = require("./httpsError");

const scheme = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required name favorite" }),
});

const validatStatus = (req, res, next) => {
  const { error } = scheme.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

module.exports = { validatStatus };
