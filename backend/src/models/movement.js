const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MovementSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    type: {
      type: String,
      enum: ["entrada", "saida", "ajuste"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quantityBefore: {
      type: Number,
      sparse: true,
    },
    date: {
      type: Date,
      required: true,
    },
    observations: {
      type: String,
      sparse: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().toUTCString() + '+03'),
    },
  },
  { versionKey: false }
);

MovementSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Movement", MovementSchema);
