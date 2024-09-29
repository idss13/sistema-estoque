const Entry = require("../models/entry");

class EntryRepository {
  async create(dados) {
    const entry = new Entry(dados);
    return await entry.save();
  }
}

module.exports = new EntryRepository();
