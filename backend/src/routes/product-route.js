const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product-controller");
const AuthService = require("../services/auth-service");
const UploadService = require("../services/upload-service");

router.post(
  "/api/product",
  UploadService.single("file"),
  AuthService.Auth,
  ProductController.create
);

router.get(
  "/api/product", 
  AuthService.Auth, 
  ProductController.getAll
);

router.get(
  "/api/product/id/:id", 
  AuthService.Auth, 
  ProductController.getId
);

router.put(
  "/api/product/update/:id",
  AuthService.Auth,
  ProductController.updateProduct
);

router.delete(
  "/api/product/:id",
  AuthService.isAdmin,
  ProductController.delete
);

module.exports = router;
