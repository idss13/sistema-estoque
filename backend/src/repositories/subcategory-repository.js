const SubCategory = require("../models/subcategory");

class SubCategoryRepository {
  async create(dados) {
    const subcategory = new SubCategory(dados);
    return await subcategory.save();
  }

  async getAll(query) {
    const { page, limit } = query;
    const options = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 25,
    };
    return await SubCategory.paginate({}, options);
  }

  async update(id, dados) {
    await SubCategory.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: dados.name,
          description: dados.description,
          categoryId: dados.categoryId,
        },
      },
      {
        new: true,
      }
    ).exec();
  }

  async delete(id) {
    await SubCategory.deleteOne({ _id: id });
  }
}

module.exports = new SubCategoryRepository();
