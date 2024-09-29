const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category-controller");
const AuthService = require("../services/auth-service");

router.post("/api/category", AuthService.Auth, CategoryController.create);
router.get("/api/category", AuthService.Auth, CategoryController.getAll);
router.put("/api/category/update/:id",AuthService.Auth, CategoryController.update);
router.delete("/api/category/:id", AuthService.isAdmin, CategoryController.delete);

module.exports = router;
