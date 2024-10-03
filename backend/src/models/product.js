const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema(
  {
    // Nome do produto
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Descrição
    description: {
      type: String,
      trim: true,
      sparse: true,
    },
    // Categoria
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    // Preço de custo
    costPrice: {
      type: Number,
      trim: true,
    },
    // Preço de venda
    salesPrice: {
      type: Number,
      trim: true,
    },
    // Quantidade minima
    minimumQuantity: {
      type: Number
    },
    // Fornecedor
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      sparse: true,
    },
    // Data de validade
    expirationDate: {
      type: Date,
      sparse: true,
    },
    // Peso
    weight: {
      type: String,
      sparse: true,
    },
    // Unidade de Medida
    unitMeasurement: {
      type: String,
      sparse: true,
    },
    // Imagem do produto
    image: {
      name: {
        type: String,
      },
      type: {
        type: String,
      },
      size: {
        type: String,
      },
      content: {
        type: Buffer,
      },
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
    },
  },
  { versionKey: false }
);

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", ProductSchema);
