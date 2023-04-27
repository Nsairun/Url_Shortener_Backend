const UtilService = require("./utils.service");

class UtilController {
  constructor() {
    this.utilService = new UtilService();
  }

  async login(req, res) {
    const { email_address, password } = req.body;

    console.log("\n longin entered \n", email_address, password, "\n");

    await this.utilService
      .loginWithEmailPassword(email_address, password)
      .then((result) => {
        let { user, token } = result;
        delete user.password;
        delete user.deletedAt;
        delete user.updatedAt;
        result.user = user;

        res.send({ user, token });
      })
      .catch((err) => res.status(401).send(err.toLocaleString()));
  }

  getCurrentUser(req, res) {
    let { user } = req;
    delete user.password;
    delete user.deletedAt;
    delete user.updatedAt;
    res.status(200).send(user);
  }
}

module.exports = UtilController;
