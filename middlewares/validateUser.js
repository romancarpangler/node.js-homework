const Joi = require("joi");
const { httpError } = require("../helpers/httpsError");

const scheme = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .messages({ "any.reqired": "missing required password field" }),
});

const validateUser = (req, res, next) => {
  const { error } = scheme.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }
  next();
};

module.exports = { validateUser };
