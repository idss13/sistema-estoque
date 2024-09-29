const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("../config/swagger");
const logger = require("../config/logger");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Habilita o CORS
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
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Logs
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
});

// Rotas
const defaultRoute = require("./routes/defaut-route");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const categoryRoute = require("./routes/category-route");
const supplierRoute = require("./routes/supplier-route");
const productRoute = require("./routes/product-route");

app.use(defaultRoute);
app.use(authRoute);
app.use(userRoute);
app.use(categoryRoute);
app.use(supplierRoute);
app.use(productRoute);

module.exports = app;
