const Category = require("../models/category");

class CategoryRepository {
  async create(dados) {
    const category = new Category(dados);
    return await category.save();
  }

  async getAll() {
    return await Category.find({}, "-createdAt -__v").exec();
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
