const Stock = require("../models/movement");

class StockRepository {
  async create(dados) {
    const stock = new Stock(dados);
    return await stock.save();
  }

  async getAll(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
    };

    if (query.productId || query.procuctName) {
      return await Stock.paginate(
        {
          $or: [
            { productId: query.productId },
            { "productId.name": { $regex: query.procuctName } },
          ],
        },
        options
      ).populate({
        path: "productId",
        populate: "categoryId supplierId",
      });
    } else {
      return await Stock.paginate({}, options);
    }
  }

  async getByProductId(productId) {
    return await Stock.findOne({ productId });
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
