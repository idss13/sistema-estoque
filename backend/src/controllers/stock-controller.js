const Movement = require("../models/movement");
const Stock = require("../models/stock");
const ProductRepository = require("../repositories/product-repository");
const MovementRepository = require("../repositories/movement-repository");
const StockRepository = require("../repositories/stock-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

// Entrada de produto do estoque
exports.entryStock = async (req, res) => {
  try {
    const { productId, quantity, observations } = req.body;

    // Busca o produto
    const product = await ProductRepository.getByID(productId);

    if (!product) {
      return res
        .status(400)
        .json(new Result(false, "Produto não encontrado", null, null));
    }

    let stock = await StockRepository.getByProductId(productId);
    if (stock) {
      stock.quantity += quantity;
    } else {
      stock = await StockRepository.create(new Stock({ productId, quantity }));
    }

    // Salva a entrada
    const result = await MovementRepository.create(
      new Movement({
        productId,
        type: "entrada",
        quantity,
        date: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
        observations,
        userId: req.user.id,
      })
    );

    // Atualiza a quantidade do produto
    await StockRepository.updateQuantity(stock._id, stock.quantity);

    return res
      .status(201)
      .json(new Result(true, "Entrada registrada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

// Saida de produto do estoque
exports.exitStock = async (req, res) => {
  try {
    const { productId, quantity, observations } = req.body;

    // Busca o produto
    const product = await ProductRepository.getByID(productId);

    if (!product) {
      return res
        .status(400)
        .json(new Result(false, "Produto não encontrado", null, null));
    }

    let stock = await StockRepository.getByProductId(productId);

    if (!stock || stock.quantity < quantity) {
      return res
        .status(400)
        .json(
          new Result(false, "Quantidade insuficiente no estoque", null, null)
        );
    }

    // Salva a saida
    const result = await MovementRepository.create(
      new Movement({
        productId,
        type: "saida",
        quantity,
        date: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
        observations,
        userId: req.user.id,
      })
    );

    // Atualiza a quantidade do produto
    stock.quantity -= quantity;
    await StockRepository.updateQuantity(stock._id, stock.quantity);

    return res
      .status(201)
      .json(new Result(true, "Saida registrada com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

// Ajuste de quantidade do estoque
exports.adjustmentStock = async (req, res) => {
  try {
    const { productId, quantity, observations } = req.body;

    const stock = await StockRepository.getByProductId(productId);

    if (!stock) {
      return res
        .status(400)
        .json(
          new Result(false, "Produto não encontrado em estoque", null, null)
        );
    }

    // Salva a entrada
    const result = await MovementRepository.create(
      new Movement({
        productId,
        type: "ajuste",
        quantity,
        quantityBefore: stock.quantity,
        date: new Date(new Date().getTime() + -3 * 60 * 60 * 1000),
        observations,
        userId: req.user.id,
      })
    );

    // Atualiza a quantidade do produto
    await StockRepository.updateQuantity(stock._id, quantity);

    return res
      .status(201)
      .json(new Result(true, "Ajuste registrado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

// Remove produto do estoque
exports.removeProductStock = async (req, res) => {
  try {
    const { productId } = req.params.productid;

    const stock = await StockRepository.getByProductId(productId);

    if (!stock) {
      return res
        .status(400)
        .json(
          new Result(true, "Produto não encontrado em estoque", null, null)
        );
    }

    await StockRepository.deleteProductStock(stock._id);

    return res
      .status(201)
      .json(
        new Result(true, "Estoque do produto removido com sucesso", null, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

// Consulta estoque atual
exports.getStock = async (req, res) => {
  const query = {
    page: req.query.page,
    limit: req.query.limit,
    productId: req.query.productId,
    procuctName: req.query.productName,
  };

  try {
    const result = await StockRepository.getAll(query);
    return res
      .status(200)
      .json(new Result(true, "Estoque retornado com sucesso", result, null));
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

// Consulta movimentações
exports.getMovements = async (req, res) => {
  const query = {
    page: req.query.page,
    limit: req.query.limit,
    productId: req.query.productId,
    procuctName: req.query.productName,
    startDate: new Date(req.query.startDate),
    endDate: new Date(req.query.endDate),
    type: req.query.type
  };

  try {
    const result = await MovementRepository.get(query);
    return res
      .status(200)
      .json(
        new Result(
          true,
          "Movimentação de estoque retornado com sucesso",
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
