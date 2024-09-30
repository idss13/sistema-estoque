const ProductRepository = require("../repositories/product-repository");
const MovementRepository = require("../repositories/movement-repository");
const SupplierRepository = require("../repositories/supplier-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");
const Movement = require("../models/movement");

exports.create = async (req, res) => {
  const { productId, supplierId, amount, type, observations } = req.body;

  // Busca o produto
  const product = await ProductRepository.getByID(productId);

  if (type == "entry") {
    const supplier = await SupplierRepository.getByID(supplierId);

    if (!product || !supplier) {
      return res
        .status(400)
        .json(
          new Result(true, "Produto ou Fornecedor não encontrado", null, null)
        );
    }

    try {
      const entry = new Movement({
        productId,
        supplierId,
        type,
        amount,
        movementDate: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
        observations,
        userId: req.user.id,
      });

      // Salva a entrada
      const result = await MovementRepository.create(entry);

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
  } else {
    if (!product) {
      return res
        .status(400)
        .json(new Result(true, "Produto não encontrado", null, null));
    }

    if (product.stock < amount) {
      return res
        .status(400)
        .json(
          new Result(true, "Quantidade insuficiente em estoque", null, null)
        );
    }

    try {
      const exit = new Movement({
        productId,
        supplierId: undefined,
        type,
        amount,
        movementDate: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
        observations,
        userId: req.user.id,
      });

      // Salva a saida
      const result = await MovementRepository.create(exit);

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
  }
};
