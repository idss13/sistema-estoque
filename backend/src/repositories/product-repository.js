const Product = require("../models/product");

class ProductRepository {
  async create(dados) {
    const product = new Product(dados);
    return await product.save();
  }

  async getByID(id) {
    return await Product.findOne({ _id: id }).exec();
  }

  async updateAmountStock(id, amount) {
    await SubCategory.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          stock: amount,
        },
      },
      {
        new: true,
      }
    ).exec();
  }
}

module.exports = new ProductRepository();
