const Stock = require("../models/stock");
const Product = require("../models/product");

class StockRepository {
  async create(dados) {
    const stock = new Stock(dados);
    return await stock.save();
  }

  async getAll(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
      populate: {
        path: "productId",
        populate: "categoryId supplierId",
      },
    };

    if (query.productId) {
      return await Stock.paginate({ productId: query.productId }, options);
    } else if (query.procuctName) {
      const find = await Product.findOne({
        name: { $regex: query.procuctName },
      }).select("_id");
      if (find) {
        return await Stock.paginate({ productId: find._id }, options);
      }
    } else {
      return await Stock.paginate({}, options);
    }
  }

  async getByProductId(productId) {
    return await Stock.findOne({ productId }).exec();
  }

  async updateQuantity(id, quantity) {
    await Stock.findOneAndUpdate(
      { _id: id },
      {
        $set: { quantity },
      },
      { new: true }
    ).exec();
  }

  async deleteProductStock(id) {
    return await Stock.deleteOne({ _id: id });
  }
}

module.exports = new StockRepository();
