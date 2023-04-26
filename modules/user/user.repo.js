const User = require("../../models/userModel");

class UserRepository {
  getAllUser() {
    return User.findAll();
  }

  getUserById(id) {
    return User.findByPk(id);
  }

  getUserByEmail(email_address) {
    return User.findOne({ where: { email_address } });
  }

  createUser(user) {
    const oldUser = this.getUserByEmail(user.email_address);

    if(oldUser.email_address) throw new Error('User Already Exist');

    return User.create(user);
  }

  editUser(user, id) {
    return User.update(user, { where: { id } });
  }

  dropUser(id) {
    return User.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
