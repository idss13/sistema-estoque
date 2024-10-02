const ProductRepository = require("../repositories/product-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.create = async (req, res) => {
  const {
    name,
    description,
    categoryId,
    costPrice,
    salesPrice,
    supplierId,
    expirationDate,
    weight,
    unitMeasurement,
  } = req.body;

  const image = req.file;

  let contract = new ValidationContract();

  contract.isRequired(name, "O nome do produto é obrigatório");
  contract.isRequired(categoryId, "ID da categoria é obrigatório");

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    return res.status(400).send(contract.errors()).end();
  }

  let imageDocument = null;
  if (image) {
    imageDocument = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      content: req.file.buffer,
    };
  }

  const product = {
    name,
    description,
    categoryId,
    costPrice,
    salesPrice,
    supplierId,
    expirationDate: expirationDate
      ? new Date(expirationDate).setUTCHours(0, 0, 0, 0)
      : undefined,
    weight,
    unitMeasurement,
    image: imageDocument !== null ? imageDocument : undefined,
  };

  try {
    const result = await ProductRepository.create(product);
    return res
      .status(201)
      .json(new Result(true, "Produto criado com sucesso", result, null));
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
    name: req.query.name,
    categoryName: req.query.categoryName,
    supplierName: req.query.supplierName,
    expirationDate: new Date(req.query.expirationDate).setUTCHours(0, 0, 0, 0),
  };

  try {
    const result = await ProductRepository.getAll(query);
    return res
      .status(200)
      .json(
        new Result(true, "Produto(s) retornado(s) com sucesso", result, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.getId = async (req, res) => {
  try {
    const result = await ProductRepository.getByID(req.params.id);
    return res
      .status(200)
      .json(new Result(true, "Produto retornado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.updateProduct = async (req, res) => {
  const {
    name,
    description,
    categoryId,
    costPrice,
    salesPrice,
    supplierId,
    expirationDate,
    weight,
    unitMeasurement,
  } = req.body;

  const image = req.file;

  let imageDocument = null;
  if (image) {
    imageDocument = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      content: req.file.buffer,
    };
  }

  const product = {
    name,
    description,
    categoryId,
    costPrice,
    salesPrice,
    supplierId,
    expirationDate: expirationDate
      ? new Date(expirationDate).setUTCHours(0, 0, 0, 0)
      : undefined,
    weight,
    unitMeasurement,
    image: imageDocument !== null ? imageDocument : undefined,
  };

  try {
    const result = await ProductRepository.updateProduct(product);
    return res
      .status(201)
      .json(new Result(true, "Produto atualizado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.delete = async (req, res) => {
  try {
    await ProductRepository.delete(req.params.id);
    return res
      .status(200)
      .json(new Result(true, "Produto removido com sucesso", null, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
