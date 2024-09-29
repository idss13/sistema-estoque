const CategoryRepository = require("../repositories/category-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.create = async (req, res) => {
  try {
    const result = await CategoryRepository.create(req.body);
    return res
      .status(201)
      .json(new Result(true, "Categoria criada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await CategoryRepository.getAll();
    return res
      .status(200)
      .json(
        new Result(
          true,
          "Lista de categoria retornada com sucesso",
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
    await CategoryRepository.update(req.params.id, req.body);
    return res
      .status(200)
      .json(new Result(true, "Categoria atualizada com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.delete = async (req, res) => {
  try {
    await CategoryRepository.delete(req.params.id);
    return res
      .status(200)
      .json(new Result(true, "Categoria removida com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
