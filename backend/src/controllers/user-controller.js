const UserRepository = require("../repositories/user-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.findAll = async (req, res) => {
  const query = {
    page: req.query.page,
    limit: req.query.limit,
    name: req.query.name,
    email: req.query.email,
  };

  try {
    const result = await UserRepository.get(query);

    if (!result.docs.length > 0) {
      return res
        .status(400)
        .json(new Result(false, "Usuário(s) não encontrado(s)", null, null));
    }

    return res
      .status(200)
      .json(
        new Result(true, "Usuário(s) retornado(s) com sucesso", result, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.getId = async (req, res) => {
  try {
    const result = await UserRepository.getByID(req.params.id);

    if (!result) {
      return res
        .status(400)
        .json(new Result(false, "Usuário(s) não encontrado(s)", null, null));
    }

    return res
      .status(200)
      .json(new Result(true, "Usuário retornado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.update = async (req, res) => {
  const { name, email, fone, roles } = req.body;

  const userUpdate = {
    name,
    email,
    fone,
    roles,
  };

  let contract = new ValidationContract();
  if (email) {
    contract.isEmail(email, "E-mail inválido");
  }

  const user = await UserRepository.getByID(req.params.id);

  if (!user) {
    return res
      .status(400)
      .json(new Result(false, "Usuário não encontrado", null, null));
  }

  try {
    const result = await UserRepository.update(req.params.id, userUpdate);
    return res
      .status(200)
      .json(new Result(true, "Usuário atualizado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await UserRepository.getByID(req.params.id);

    if (!user) {
      return res
        .status(400)
        .json(new Result(false, "Usuário não encontrado", null, null));
    }

    await UserRepository.delete(req.params.id);
    return res
      .status(200)
      .json(new Result(true, "Usuário removido com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
