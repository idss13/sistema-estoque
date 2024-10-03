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

    if(query.name){
      return await Product.paginate(
        {name: { $regex: query.name }},
        options
      ).populate("categoryId supplierId");
    }
    else if(query.categoryName){
      return await Product.paginate(
        {"categoryId.name": { $regex: query.categoryName }},
        options
      ).populate("categoryId supplierId");
    }
    else if(query.supplierName){
      return await Product.paginate(
        {"supplierId.name": { $regex: query.supplierName }},
        options
      ).populate("categoryId supplierId");
    }
    else if (
      query.categoryId ||
      query.supplierId ||
      query.expirationDate
    ) {
      return await Product.paginate(
        {
          $or: [
            { categoryId: query.categoryId },
            { supplierId: query.supplierId },
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
