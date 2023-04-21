const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("./constants");

function signToken(data) {
  return jwt.sign(
    {
      data,
    },
    PRIVATE_KEY,
    { expiresIn: 60 * 60 }
  );
}

function verifyToken(token) {
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = { signToken, verifyToken };