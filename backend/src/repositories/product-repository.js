const Product = require("../models/product");
const Supplier = require("../models/supplier");
const Category = require("../models/category");

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
      populate: "categoryId supplierId",
    };

    if (query.name) {
      return await Product.paginate({ name: { $regex: query.name } }, options);
    } else if (query.categoryName) {
      const find = await Category.findOne({
        name: { $regex: query.categoryName },
      }).select("_id");

      if (find) {
        return await Product.paginate({ categoryId: find._id }, options);
      }
    } else if (query.supplierName) {
      const find = await Supplier.findOne({
        name: { $regex: query.supplierName },
      }).select("_id");

      if (find) {
        return await Product.paginate({ supplierId: find._id }, options);
      }
    } else if (query.categoryId || query.supplierId || query.expirationDate) {
      return await Product.paginate(
        {
          $or: [
            { categoryId: query.categoryId },
            { supplierId: query.supplierId },
            { expirationDate: query.expirationDate },
          ],
        },
        options
      );
    } else {
      return await Product.paginate({}, options);
    }
  }

  async updateProduct(id, dados) {
    return await Product.findOneAndUpdate(
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
