const UserRepository = require("../repositories/user-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.findAll = async (req, res) => {
  try {
    const result = await UserRepository.get(req.query);
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
  try {
    await UserRepository.update(req.params.id, req.body);
    return res
      .status(200)
      .json(new Result(true, "Usuário atualizado com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.delete = async (req, res) => {
  try {
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

exports.resetPassword = async (req, res) => {
  let contract = new ValidationContract();

  contract.hasMinLen(
    req.body.password,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    return res.status(400).send(contract.errors()).end();
  }

  const newPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await UserRepository.updatePassword(req.params.id, newPassword);
    return res
      .status(200)
      .json(new Result(true, "Senha alterada com sucesso", null, null));
  } catch (error) {
    return res
      .status(400)
      .json(
        new Result(false, "Falha ao alterar a senha do usuário", null, error)
      );
  }
};
