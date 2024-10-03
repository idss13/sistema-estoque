const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const StockSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
    },
  },
  { versionKey: false }
);

StockSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Stock", StockSchema);
