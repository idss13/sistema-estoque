const User = require("../models/user");

class UserRepository {
  async create(dados) {
    const user = new User(dados);
    return await user.save();
  }

  async get(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
      select: "-password",
    };
    if (query.name || query.email) {
      return await User.paginate(
        { $or: [{ name: query.name }, { email: query.name }] },
        options
      );
    } else {
      return await User.paginate({}, options);
    }
  }

  async getByID(id) {
    return await User.findOne({ _id: id }, "-password").exec();
  }

  async getByEmail(email) {
    return await User.findOne({ email }).exec();
  }

  async update(id, dados) {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: dados.name,
          email: dados.email,
          fone: dados.fone,
          roles: dados.roles,
          passwordResetToken: dados.passwordResetToken,
          passwordResetExpires: dados.passwordResetExpires,
          password: dados.password,
        },
      },
      {
        new: true,
      }
    ).exec();
  }

  async delete(id) {
    await User.deleteOne({ _id: id });
  }

  async getTokenPassword(token) {
    return await User.findOne(
      {
        passwordResetToken: token,
        passwordResetExpires: {
          $gt: Date(new Date().toString()),
        },
      },
      "-password"
    ).exec();
  }
}

module.exports = new UserRepository();
