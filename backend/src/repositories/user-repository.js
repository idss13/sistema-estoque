const User = require("../models/user");

class UserRepository {
  async create(dados) {
    const user = new User(dados);
    return await user.save();
  }

  async get(query) {
    const { page, limit, name, email } = query;
    const options = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 25,
      select: "-createdAt -__v -password",
    };
    if (name || email) {
      return await User.paginate({ $or: [{ name }, { email }] }, options);
    } else {
      return await User.paginate({}, options);
    }
  }

  async getByID(id) {
    return await User.findOne(
      { _id: id },
      "-__v -createdAt -password"
    ).exec();
  }

  async getByEmail(email) {
    return await User.findOne({ email }, "-__v -createdAt").exec();
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

  async updatePassword(id, password) {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          password,
        },
      },
      {
        new: true,
      }
    ).exec();
  }
}

module.exports = new UserRepository();
