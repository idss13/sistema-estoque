const Exit = require("../models/exit");

class ExitRepository {
  async create(dados) {
    const exit = new Exit(dados);
    return await entry.exit();
  }
}

module.exports = new ExitRepository();
