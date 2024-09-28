const User = require("../models/user");

class UserRepository {
  async create(dados) {
    const user = new User(dados);
    return await user.save();
  }

  async get() {
    return await User.find({}, "-__v").exec();
  }

  async getByID(id) {
    return await User.findOne({ _id: id }, "-__v").exec();
  }

  async getByEmail(email) {
    return await User.findOne({ email }, "-__v").exec();
  }

  async update(id, dados) {
    return await User.findOneAndUpdate({ _id: id }, dados, {
      new: true,
    }).exec();
  }

  async delete(id) {
    return await User.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository();
