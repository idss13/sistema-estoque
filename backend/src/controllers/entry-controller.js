const ProductRepository = require("../repositories/product-repository");
const EntryRepository = require("../repositories/entry-repository");
const SupplierRepository = require("../repositories/supplier-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");
const Entry = require("../models/entry");

exports.createEntry = async (req, res) => {
  const { productId, supplierId, amount, observations } = req.body;

  const product = await ProductRepository.getByID(productId);
  const supplier = await SupplierRepository.getByID(supplierId);

  if (!product || !supplier) {
    return res
      .status(400)
      .json(
        new Result(true, "Produto ou Fornecedor não encontrado", null, null)
      );
  }

  try {
    const entry = new Entry({
      productId,
      supplierId,
      amount,
      entryDate: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
      observations,
      userId: req.user.id,
    });

    // Salva a entrada
    const result = await EntryRepository.create(entry);

    // Atualiza a quantidade do produto
    product.stock += amount;
    await ProductRepository.updateAmountStock(product._id, product.stock);

    return res
      .status(201)
      .json(new Result(true, "Entrada registrada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
