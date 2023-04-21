const User = require("../../models/userModel");
const { verifyToken } = require("./jwt");

const authMiddleware = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const token = authorization?.split(" ").pop();

  if (token) {
    try {
      const { data } = verifyToken(token);
      const user = await User.findByPk(data.id);
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
