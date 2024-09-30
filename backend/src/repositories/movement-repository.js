const Movement = require("../models/movement");

class MovementRepository {
  async create(dados) {
    const movement = new Movement(dados);
    return await movement.save();
  }
}

module.exports = new MovementRepository();
