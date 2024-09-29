const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const EntrySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      sparse: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    entryDate: {
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

EntrySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Entry", EntrySchema);
