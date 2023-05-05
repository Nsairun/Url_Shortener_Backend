const bcrypt = require("bcrypt");
const JWT = require("../services/jwt");
const UserRepository = require("../user/user.repo");

class UtilService {
  constructor() {
    this.userRepo = new UserRepository();
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
}

module.exports = UtilService;
