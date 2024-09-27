const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      retryWrites: true,
      connectTimeoutMS: 10000,
      writeConcern: {
        j: true,
      },
      w: "majority",
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
