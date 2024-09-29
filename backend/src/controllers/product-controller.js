const ProductRepository = require("../repositories/product-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.create = async (req, res) => {
  let contract = new ValidationContract();

  contract.isRequired(req.body.name, "O nome do produto é obrigatório");
  contract.isRequired(
    req.body.subCategoryId,
    "ID da subcategoria é obrigatório"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    return res.status(400).send(contract.errors()).end();
  }

  let imageDocument = null;
  if (req.file) {
    imageDocument = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      content: req.file.buffer,
    };
  }

  const product = {
    name: req.body.name,
    description: req.body.description,
    subCategoryId: req.body.subCategoryId,
    costPrice: req.body.costPrice,
    salesPrice: req.body.salesPrice,
    availability: true,
    supplierId: req.body.supplierId,
    expirationDate: req.body.expirationDate
      ? new Date(req.body.expirationDate).setUTCHours(0, 0, 0, 0)
      : undefined,
    weight: req.body.weight,
    unitMeasurement: req.body.unitMeasurement,
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
