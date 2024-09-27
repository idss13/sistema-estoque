const User = require("../models/User");

class UserService {
  async createUser(dados) {
    const user = new User(dados);
    return await user.save();
  }

  async getUsers() {
    return await User.find({}, "-__v").exec();
  }

  async getUserByID(id) {
    return await User.findOne({ _id: id }, "-__v").exec();
  }

  async updateUser(id, dados) {
    return await User.findOneAndUpdate(
      { _id: id }, 
      dados, 
      {new: true}
    )
    .exec();
  }

  async deleteUser(id) {
    return await User.deleteOne({_id: id});
  }
}

module.exports = new UserService();
