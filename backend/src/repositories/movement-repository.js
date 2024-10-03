const Movement = require("../models/movement");

class MovementRepository {
  async create(dados) {
    const movement = new Movement(dados);
    return await movement.save();
  }

  async get(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
    };

    if (
      query.productId ||
      query.procuctName ||
      query.startDate ||
      query.endDate ||
      query.type
    ) {
      return await Movement.paginate(
        {
          $or: [
            { productId: query.productId },
            { "productId.name": { $regex: query.procuctName } },
            { date: { $gte: query.startDate, $lte: query.endDate } },
            { type: query.type }
          ],
        },
        options
      )
      .populate({
        path: "productId",
        populate: "categoryId supplierId",
      })
      .populate("userId");
    } else {
      return await Movement.paginate({}, options);
    }
  }
}

module.exports = new MovementRepository();
