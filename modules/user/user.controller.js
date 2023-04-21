import UserService from "./user.service";

const User = require("../../models/userModel");

export default class UserController {
  constructor() {
    this.userService = new UserService(); // all the methods using this.userService are methods from the UserService class
  }

  getAllUsers(req, res) {
    this.userService.getAllUsers();

    res.status(200).send(this.userService.getAllUsers())
  }

  createOneUser(req, res) {
    const { user_name, password, email_address } = req.body;

    if (!(user_name && password && email_address)) {
      return res.status(406).send("{ Missing User Info }");
    }

    this.userService
      .registerUser(user_name, password, email_address)
      .then((user) => res.status(201).send(user))
      .catch((err) => res.status(500).send(err));
  }

  patchOneUser(req, res) {
    this.userService.editOneUser(req.body, id)
      .then((updatedUser) => res.status(202).send(updatedUser))
      .catch((err) => res.status(401).send(err));
  }

  deleteOneUser(req, res) {
    this.userService
      .deleteOneUser(+req.params.id)
      .then(() => res.sendStatus(202))
      .catch((err) => res.status(500).send(err));
  }
}

// const patchOneUser = async (req, res) => {
//   const user = await User.findOne({ where: { id: +req.params.id } });

//   if (!user) return res.status(401).send("{ user does not exist }");

//   await User.update(req.body, { where: { id: +req.params.id } });

//   const updatedUser = await User.findOne({ where: { id: req.params.id } });

//   res.status(202).send(updatedUser);
// };
