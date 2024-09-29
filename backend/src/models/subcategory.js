const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome da subcategoria é obrigatório"],
    },
    description: {
      type: String,
      sparse: true,
    },
    // Categoria
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
    },
  },
  { versionKey: false }
);

SubCategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("SubCategory", SubCategorySchema);
