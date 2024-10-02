const Category = require("../models/category");

class CategoryRepository {
  async create(dados) {
    const category = new Category(dados);
    return await category.save();
  }

  async getAll(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
    };
    return await Category.paginate({}, options);
  }

  async update(id, dados) {
    await Category.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: dados.name,
          description: dados.description,
        },
      },
      {
        new: true,
      }
    ).exec();
  }

  async delete(id) {
    await Category.deleteOne({ _id: id });
  }
}

module.exports = new CategoryRepository();
