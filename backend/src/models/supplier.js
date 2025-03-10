const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome do fornecedor é obrigatório"],
    },
    cnpj: {
      type: String,
      required: [true, "CNPJ do fornecedor é obrigatório"],
      unique: true,
      trim: true,
    },
    contact: {
      telephone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      complement:{
        type: String,
        trim: true
      },
      cep: {
        type: String,
        trim: true,
      },
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().toUTCString() + '+03'),
    },
  },
  { versionKey: false }
);

SupplierSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Supplier", SupplierSchema);
