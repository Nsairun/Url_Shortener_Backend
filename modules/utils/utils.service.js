const bcrypt = require("bcrypt");
const UserRepository = require("../user/user.repo");
const UtilRepository = require("./utils.repo");

class UtilService {
  constructor() {
    this.userRepo = new UserRepository();
    this.utilRepo = new UtilRepository();
  }

  async loginWithEmailPassword(emai_address, password) {
    let user = await this.userRepo.getUserByEmail(emai_address);

    console.log('\n this user in loginwith... \n', user?.dataValues, '\n')

    if (!user) throw new Error("CANNOT_LOGIN");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("CANNOT_LOGIN");

    const token = this.utilRepo.signToken(user);

    if(user.dataValues.id && user.dataValues.password) user = user.dataValues

    return { user, token };
  }
}

module.exports = UtilService;
