const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema Estoque",
      version: "1.0.0",
      description: "Documentação da API",
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerOptions;
