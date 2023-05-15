const bcrypt = require("bcrypt");
const JWT = require("../services/jwt");
const UserRepository = require("../user/user.repo");
const UtilRepository = require("./utils.repo");

class UtilService {
  constructor() {
    this.userRepo = new UserRepository();
    this.utilRepo = new UtilRepository();
    this.jwt = new JWT();
  }

  async loginWithEmailPassword(emai_address, password) {
    let user = await this.userRepo.getUserByEmail(emai_address);

    if (!user) throw new Error("CANNOT_LOGIN");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("CANNOT_LOGIN");

    const token = this.jwt.signToken(user);

    if (user.dataValues.id && user.dataValues.password) user = user.dataValues;

    return { user, token };
  }

  async getLongUrl(short) {
    try {
      const { long_url } = await this.utilRepo.getShortUrl(short);

      if (!long_url) throw new Error("NO_URL");

      return { statusCode: 200, long_url };
    } catch {
      throw new Error("PAGE_NOT_FOUND");
    }
  }
}

module.exports = UtilService;
