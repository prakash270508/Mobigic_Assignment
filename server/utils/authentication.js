const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(createError(403, "Please login"));
  }
  const data = jwt.verify(token, "Thhisisaverypowerfullsecretekey");

  req.user = await User.findById(data._id);

  next();
};

module.exports = {
  verifyToken,
};
