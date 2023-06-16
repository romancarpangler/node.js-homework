const Joi = require("joi");

const scheme = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required field email" }),
});

const verify = (req, res, next) => {
  const { error } = scheme.validate(req.body);

  if (error) {
    const errors = new Error(error.message);
    errors.status = 400;
    next(errors);
  }
  next();
};

module.exports = { verify };
