const UserService = require("./user.service");

class UserController {
  constructor() {
    this.userService = new UserService(); // all the methods using this.userService are methods from the UserService class
  }

  async getAllUsers(_, res) {
    const allUsers = await this.userService.getAllUsers();

    if (allUsers.length <= 0) return res.sendStatus(404);

    res.status(200).send(allUsers);
  }

  async getOneUser(req, res) {
    const user = await this.userService.getOneUser(+req.params.id);

    if (!user) return res.sendStatus(404);

    res.status(200).send(user);
  }

  createOneUser(req, res) {
    const { user_name, password, email_address } = req.body;

    if (!(user_name && password && email_address)) {
      return res.status(406).send({ message: "Missing User Info" });
    }

    this.userService
      .registerUser(user_name, password, email_address)
      .then(({statusCode, result}) => res.status(statusCode).send(result))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }

  patchOneUser(req, res) {
    this.userService
      .editOneUser(req.body, +req.params.id)
      .then((updatedUser) => res.status(202).send(updatedUser))
      .catch((err) => res.status(401).send(err.toLocaleString()));
  }

  deleteOneUser(req, res) {
    this.userService
      .deleteOneUser(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }
}

module.exports = UserController;
