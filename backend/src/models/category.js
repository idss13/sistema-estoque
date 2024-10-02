const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome da categoria é obrigatório"],
    },
    description: {
      type: String,
      sparse: true,
    },
    createdAt: {
      type: Date,
      default: Date(new Date().toString()),
    },
  },
  { versionKey: false }
);

CategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", CategorySchema);
