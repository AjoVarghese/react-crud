const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKENCODE, {
    expiresIn: "30d",
  });
};
