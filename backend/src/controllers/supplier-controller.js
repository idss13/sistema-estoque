const SupplierRepository = require("../repositories/supplier-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.create = async (req, res) => {
  let contract = new ValidationContract();

  contract.isRequired(req.body.name, "O nome do fornecedor é obrigatório");
  contract.isRequired(req.body.cnpj, "CNPJ do fornecedor é obrigatório");

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    return res.status(400).send(contract.errors()).end();
  }

  try {
    const result = await SupplierRepository.create(req.body);
    return res
      .status(201)
      .json(new Result(true, "Fornecedor criado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await SupplierRepository.get(req.query);
    return res
      .status(200)
      .json(
        new Result(
          true,
          "Fornecedor(es) retornado(s) com sucesso",
          result,
          null
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.update = async (req, res) => {
  try {
    await SupplierRepository.update(req.params.id, req.body);
    return res
      .status(200)
      .json(new Result(true, "Fornecedor atualizado com sucesso", null, null));
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
      .json(new Result(true, "Fornecedor removido com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
