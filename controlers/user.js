const User = require("../shema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SEKRET_KEY } = process.env;

const { httpError } = require("../helpers/httpsError");

const registerUser = async (req, res, next) => {
  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser !== null) {
      throw httpError(409, "Email in use");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const result = await User.create(req.body);

    const users = {
      email: result.email,
      subscription: result.subscription,
    };

    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user === null) {
      throw httpError(401, "Email or password is wrong");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw httpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;

    const payload = { id };

    const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "24h" });

    await User.findByIdAndUpdate(id, { token });

    const response = {
      token: token,
      user: { email: user.email, subscription: user.subscription },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const currentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logoutUser = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).end();
};

module.exports = { registerUser, loginUser, currentUser, logoutUser };
