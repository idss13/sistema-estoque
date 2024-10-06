const { populate } = require("../models/category");
const Movement = require("../models/movement");
const Product = require("../models/product");

class MovementRepository {
  async create(dados) {
    const movement = new Movement(dados);
    return await movement.save();
  }

  async get(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
      populate: [
        {
          path: "productId",
          populate: "categoryId supplierId",
        },
        {
          path: "userId",
          select: "-password"
        },
      ],
      // Para melhor performance, retorna objetos JavaScript simples
      // lean: true, 
    };

    if (query.procuctName) {
      const find = await Product.findOne({
        name: { $regex: query.procuctName },
      }).select("_id");
      if (find) {
        return await Movement.paginate({ productId: find._id }, options);
      }
    } else if (
      query.productId ||
      query.startDate ||
      query.endDate ||
      query.type
    ) {
      return await Movement.paginate(
        {
          $or: [
            { productId: query.productId },
            { date: { $gte: query.startDate, $lte: query.endDate } },
            { type: query.type },
          ],
        },
        options
      );
    } else {
      return await Movement.paginate({}, options);
    }
  }
}

module.exports = new MovementRepository();
