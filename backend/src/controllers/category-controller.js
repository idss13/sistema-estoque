const CategoryRepository = require("../repositories/category-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.create = async (req, res) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const result = await CategoryRepository.create(category);
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
  const query = {
    page: req.query.page,
    limit: req.query.limit,
  };

  try {
    const result = await CategoryRepository.getAll(query);

    if (!result.docs.length > 0) {
      return res
        .status(400)
        .json(
          new Result(false, "Categoria(s) não encontrada(s)", null, null)
        );
    }

    return res
      .status(200)
      .json(
        new Result(true, "Categoria(s) retornada(s) com sucesso", result, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.update = async (req, res) => {
  const category = await CategoryRepository.getByID(req.params.id);

  if (!category) {
    return res
      .status(400)
      .json(new Result(false, "Categoria não encontrada", null, null));
  }

  const updateCategory = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const result = await CategoryRepository.update(
      req.params.id,
      updateCategory
    );
    return res
      .status(200)
      .json(new Result(true, "Categoria atualizada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await CategoryRepository.getByID(req.params.id);

    if (!category) {
      return res
        .status(400)
        .json(new Result(false, "Categoria não encontrada", null, null));
    }

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
