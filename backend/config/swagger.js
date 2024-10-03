const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Controle de Estoque",
      version: "1.0.0",
      description: "Documentação da API",
    },
  },
  apis: ["./src/utils/swagger-docs/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpecs;