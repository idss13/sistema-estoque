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

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
// const productRoutes = require("./routes/productRoutes");

app.use(defaultRoute);
app.use(authRoute);
// app.use("/api/products", productRoutes);

module.exports = app;
