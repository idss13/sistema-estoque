const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/supplier-controller");
const AuthService = require("../services/auth-service");

router.post("/api/supplier", AuthService.Auth, SupplierController.create);
router.get("/api/supplier", AuthService.Auth, SupplierController.findAll);
router.put("/api/supplier/update/:id",AuthService.Auth, SupplierController.update);
router.delete("/api/supplier/:id", AuthService.isAdmin, SupplierController.delete);

module.exports = router;
