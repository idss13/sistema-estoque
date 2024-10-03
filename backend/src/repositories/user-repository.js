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
    if (query.name) {
      return await User.paginate({ name: { $regex: query.name } }, options);
    } else if (query.email) {
      return await User.paginate({ email: query.email }, options);
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
    return await User.findOneAndUpdate(
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
    )
    .select("-password")
    .exec();
  }

  async delete(id) {
    await User.deleteOne({ _id: id });
  }

  async getTokenPassword(token) {
    return await User.findOne(
      {
        passwordResetToken: token,
        passwordResetExpires: {
          $gt: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
        },
      },
      "-password"
    ).exec();
  }
}

module.exports = new UserRepository();
