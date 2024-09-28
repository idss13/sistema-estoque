const { createLogger, format, transports } = require("winston");

// Configuração do logger
const logger = createLogger({
  level: "info", // Define o nível de log (info, warn, error)
  format: format.combine(
    format.colorize(), // Adiciona cores aos logs no console
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Adiciona timestamp aos logs
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Mostra logs no console
  ],
});

module.exports = logger;
