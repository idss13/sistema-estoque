const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API - Sistema Controle de Estoque",
      version: "1.0.0",
      description: "Documentação da API",
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerOptions;
