const SubCategoryRepository = require("../repositories/subcategory-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.create = async (req, res) => {
  try {
    const result = await SubCategoryRepository.create(req.body);
    return res
      .status(201)
      .json(new Result(true, "SubCategoria criada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await SubCategoryRepository.getAll(req.query);
    return res
      .status(200)
      .json(
        new Result(
          true,
          "Lista de subcategoria retornada com sucesso",
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
    await SubCategoryRepository.update(req.params.id, req.body);
    return res
      .status(200)
      .json(new Result(true, "SubCategoria atualizada com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.delete = async (req, res) => {
  try {
    await SubCategoryRepository.delete(req.params.id);
    return res
      .status(200)
      .json(new Result(true, "SubCategoria removida com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
