const http = require("http");
const app = require("../src/app");
const logger = require("./logger");

const port = process.env.PORT;

app.set("port", port);

/** Cria o servidor*/
const server = http.createServer(app);
server.listen(port || 3001, () => {
  logger.info(`Server running on the port ${port}`);
});
