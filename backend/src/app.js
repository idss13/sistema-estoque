const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require('./middlewares/logger');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);

// Conexão ao MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB conectado"))
//   .catch((err) => console.log(err));

// Rotas
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
