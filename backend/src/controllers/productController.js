const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
