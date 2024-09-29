const ProductRepository = require("../repositories/product-repository");
const ExitRepository = require("../repositories/exit-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");
const Exit = require("../models/exit");

exports.createExit = async (req, res) => {
  const { productId, amount, observations } = req.body;

  const product = await ProductRepository.getByID(productId);

  if (!product) {
    return res
      .status(400)
      .json(new Result(true, "Produto não encontrado", null, null));
  }

  if (product.stock < amount) {
    return res
      .status(400)
      .json(new Result(true, "Quantidade insuficiente em estoque", null, null));
  }

  try {
    const exit = new Exit({
      productId,
      amount,
      exitDate: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
      observations,
      userId: req.user.id,
    });

    // Salva a saida
    const result = await ExitRepository.create(exit);

    // Atualiza a quantidade do produto
    product.stock -= amount;
    await ProductRepository.updateAmountStock(product._id, product.stock);

    return res
      .status(201)
      .json(new Result(true, "Saída registrada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
