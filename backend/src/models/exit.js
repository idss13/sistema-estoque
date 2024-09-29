const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ExitSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    amount: {
      type: Number,
      required: true,
    },
    exitDate: {
      type: Date,
    },
    observations: {
      type: String,
      sparse: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

ExitSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Exit", ExitSchema);
