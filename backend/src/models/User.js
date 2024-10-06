const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "O email é obrigatório"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "A senha é obrigatória"],
    },
    fone: {
      type: String,
      sparse: true,
    },
    roles: [
      {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
      },
    ],
    passwordResetToken: {
      type: String,
      sparse: true,
    },
    passwordResetExpires: {
      type: Date,
      sparse: true,
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().toUTCString() + '+03'),
    },
  },
  { versionKey: false }
);

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
