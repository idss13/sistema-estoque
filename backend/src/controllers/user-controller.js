const UserRepository = require("../repositories/user-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");
const crypto = require("crypto");
const SendPasswordResetEmail = require("../services/mailer");
const bcrypt = require("bcryptjs");

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

exports.requestPasswordReset = async (req, res) => {
  // Encontre o usuário pelo e-mail
  const user = await UserRepository.getByEmail(req.body.email);
  if (!user) {
    return res
      .status(400)
      .json(new Result(true, "Usuário não encontrado", null, null));
  }

  try {
    // Gera um token de recuperação de senha
    const token = crypto.randomBytes(32).toString("hex");

    let expiresToken = new Date(new Date().getTime() + -3 * 60 * 60 * 1000);
    expiresToken.setHours(expiresToken.getHours() + 1);

    const dataToken = {
      passwordResetToken: token,
      passwordResetExpires: expiresToken,
    };

    // Salve o token no banco de dados
    await UserRepository.update(user._id, dataToken);

    // Envie o e-mail
    await SendPasswordResetEmail(user.email, token);

    return res
      .status(200)
      .json(
        new Result(true, "E-mail de recuperação de senha enviado", null, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.resetPassword = async (req, res) => {
  let { token, newPassword } = req.body;

  const user = await UserRepository.getTokenPassword(token);

  if (!user) {
    return res
      .status(400)
      .json(new Result(false, "Token inválido ou expirado", null, null));
  }

  let contract = new ValidationContract();

  contract.hasMinLen(
    newPassword,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    return res.status(400).send(contract.errors()).end();
  }

  newPassword = await bcrypt.hash(req.body.password, 10);

  const updatePassword = {
    password: newPassword,
    passwordResetToken: null,
    passwordResetExpires: null,
  };

  try {
    await UserRepository.update(user._id, updatePassword);
    return res
      .status(200)
      .json(new Result(true, "Senha redefinida com sucesso", null, null));
  } catch (error) {
    return res
      .status(400)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
