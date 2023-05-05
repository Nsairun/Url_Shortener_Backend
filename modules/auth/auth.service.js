const User = require("../../models/userModel");
const JWT = require("../services/jwt");
const jwt = new JWT();

const authMiddleware = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const token = authorization?.split(" ").pop();

  if (token) {
    try {
      const bearer = jwt.verifyToken(token);
      const user = await User.findByPk(bearer.bearer_id);
      if (!user) return res.sendStatus(401);
      req.user = user;
      next();
    } catch (e) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authMiddleware };
