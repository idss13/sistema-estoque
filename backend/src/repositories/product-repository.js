const Product = require("../models/product");

class ProductRepository {
  async create(dados) {
    const product = new Product(dados);
    return await product.save();
  }

  async getByID(id) {
    return await Product.findOne({ _id: id })
      .populate("categoryId supplierId")
      .exec();
  }

  async getAll(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
    };
    if (
      query.name ||
      query.categoryName ||
      query.supplierName ||
      query.expirationDate
    ) {
      return await Product.paginate(
        {
          $or: [
            { name: { $regex: query.name } },
            { "categoryId.name": { $regex: query.categoryName } },
            { "supplierId.name": { $regex: query.supplierName } },
            { expirationDate: query.expirationDate },
          ],
        },
        options
      ).populate("categoryId supplierId");
    } else {
      return await Product.paginate({}, options).populate("categoryId supplierId");
    }
  }

  async updateProduct(id, dados) {
    await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: dados.name,
          description: dados.description,
          categoryId: dados.categoryId,
          costPrice: dados.costPrice,
          salesPrice: dados.salesPrice,
          minimumQuantity: dados.minimumQuantity,
          supplierId: dados.supplierId,
          expirationDate: dados.expirationDate,
          weight: dados.weight,
          unitMeasurement: dados.unitMeasurement,
          image: dados.image,
        },
      },
      {
        new: true,
      }
    ).exec();
  }
  
  async delete(id) {
    await Product.deleteOne({ _id: id });
  }
}

module.exports = new ProductRepository();
