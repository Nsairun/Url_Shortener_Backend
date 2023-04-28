const UserRepository = require("./user.repo");
const { SALT_ROUNDS } = require("../services/constant");

const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepo = new UserRepository(); // i've put all my sequelize functions in UserRepository().. things like findByPk(), findOne(), create(), update(), destroy()...
  }

  async getAllUsers() {
    const allUsers = await this.userRepo.getAllUser();
    return allUsers;
  }

  async getOneUser(id) {
    const user = await this.userRepo.getUserById(id);
    return user;
  }

  async registerUser(user_name, password, email_address) {
    try {
      const duplicateUser = await this.userRepo.getOnlineAndOfflineEmail(
        email_address
      );

      if (duplicateUser)
        return { statusCode: 409, result: "USER_ALREADY_EXIST" };

      const hash = await bcrypt.hash(password, SALT_ROUNDS);

      const result = await this.userRepo.createUser({
        user_name,
        email_address,
        password: hash,
      });

      return { statusCode: 201, result };
    } catch {
      throw new Error("COULD_NOT_CREATE_USER");
    }
  }

  async editOneUser(userToEdit, id) {
    const user = await this.userRepo.getUserById(id);

    if (!user) throw new Error("USER_DOES_NOT_EXIST");

    await this.userRepo.editUser(userToEdit, id);

    const updatedUser = await this.userRepo.getUserById(id);

    return updatedUser;
  }

  async deleteOneUser(id) {
    try {
      const user = await this.userRepo.getUserById(id);

      if (!user) return 404;

      await this.userRepo.dropUser(id);
      return 202;
    } catch {
      throw new Error("COULD_NOT_DELETE_USER");
    }
  }

  /* 
    ma bro Kadji, i'm sure you are to write the login function here as well,
    remember that getUserByEmail(emai_address) is 
    allready in the UserRepository class
  */
}

module.exports = UserService;
