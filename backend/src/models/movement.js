const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MovementSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      sparse: true,
    },
    type: {
      type: String,
      // Entrada ou Saida
      enum: ["entry", "exit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    movementDate: {
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
  },
  { versionKey: false }
);

MovementSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Movement", MovementSchema);
