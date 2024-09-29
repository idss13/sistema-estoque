const Product = require("../models/product");

class ProductRepository {
  async create(dados) {
    const product = new Product(dados);
    return await product.save();
  }
}

module.exports = new ProductRepository();
