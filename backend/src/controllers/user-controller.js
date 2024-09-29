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

