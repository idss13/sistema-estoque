const Supplier = require("../models/supplier");

class SupplierRepository {
  async create(dados) {
    const supplier = new Supplier(dados);
    return await supplier.save();
  }

  async get(query) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 25,
    };
    if (query.name || query.cnpj) {
      return await Supplier.paginate(
        { $or: [{ name: query.name }, { cnpj: query.cnpj }] },
        options
      );
    } else {
      return await Supplier.paginate({}, options);
    }
  }

  async getByID(id) {
    return await Supplier.findOne({ _id: id }).exec();
  }

  async update(id, dados) {
    await Supplier.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: dados.name,
          cnpj: dados.cnpj,
          contact: dados.contact,
          address: dados.address
        },
      },
      { new: true }
    ).exec();
  }

  async delete(id) {
    await Supplier.deleteOne({ _id: id });
  }
}

module.exports = new SupplierRepository();
