const express = require("express");
const router = express.Router();
const SubCategoryController = require("../controllers/subcategory-controller");
const AuthService = require("../services/auth-service");

router.post("/api/subcategory", AuthService.Auth, SubCategoryController.create);
router.get("/api/subcategory", AuthService.Auth, SubCategoryController.getAll);
router.put("/api/subcategory/update/:id",AuthService.Auth, SubCategoryController.update);
router.delete("/api/subcategory/:id", AuthService.isAdmin, SubCategoryController.delete);

module.exports = router;
