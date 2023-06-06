const jwt = require("jsonwebtoken");
const User = require("../shema/user");

const { httpError } = require("../helpers/httpsError");

const { SEKRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [b, token] = authorization.split(" ");
  if (b !== "Bearer") {
    next(httpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SEKRET_KEY);

    const user = await User.findOne({ _id: id });
    if (!user || !user.token) {
      next(httpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
