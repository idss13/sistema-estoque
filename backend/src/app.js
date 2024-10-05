const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const swaggerUi = require("swagger-ui-express");
const docSwagger = require("./swagger/docs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Habilita o CORS
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Conectar ao banco de dados
connectDB();

// Documentação Swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(docSwagger));

// Rotas
app.use(
  require("./routes/auth-route"),
  require("./routes/category-route"),
  require("./routes/defaut-route"),
  require("./routes/product-route"),
  require("./routes/stock-route"),
  require("./routes/supplier-route"),
  require("./routes/user-route")
);

module.exports = app;
