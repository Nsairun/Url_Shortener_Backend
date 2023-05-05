const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../services/constant");

class JWT {
  signToken(user) {
    return jwt.sign(
      { bearer_id: user.id, bearer_email: user.email_address },
      JWT_PRIVATE_KEY,
      { expiresIn: "1h" }
    );
  }

  verifyToken(token) {
    return jwt.verify(token, JWT_PRIVATE_KEY);
  }
}

module.exports = JWT;