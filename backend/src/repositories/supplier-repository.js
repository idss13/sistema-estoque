const Supplier = require("../models/supplier");

class SupplierRepository {
  async create(dados) {
    const supplier = new Supplier(dados);
    return await supplier.save();
  }

  async get(query) {
    const { page, limit, name, cnpj } = query;
    const options = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 25,
      select: "-createdAt -__v",
    };
    if (name || cnpj) {
      return await Supplier.paginate({ $or: [{ name }, { cnpj }] }, options);
    } else {
      return await Supplier.paginate({}, options);
    }
  }
  
  async update(id, dados) {
    await Supplier.findOneAndUpdate({ _id: id }, dados, { new: true }).exec();
  }

  async delete(id) {
    await Supplier.deleteOne({ _id: id });
  }
}

module.exports = new SupplierRepository();
