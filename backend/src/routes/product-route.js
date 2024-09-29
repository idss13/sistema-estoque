const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product-controller");
const AuthService = require("../services/auth-service");
const UploadService = require("../services/upload-service");

router.post(
  "/api/product",
  UploadService.single("file"),
  AuthService.Auth,
  ProductController.create,
);

module.exports = router;
