const express = require("express");
const router = express.Router();
const StockController = require("../controllers/stock-controller");
const AuthService = require("../services/auth-service");

router.post("/api/stock/entry", AuthService.Auth, StockController.entryStock);
router.post("/api/stock/exit", AuthService.Auth, StockController.exitStock);
router.post("/api/stock/adjustment", AuthService.Auth, StockController.adjustmentStock);
router.delete("/api/stock/remove/:productid", AuthService.isAdmin, StockController.removeProductStock);
router.get("/api/stock", AuthService.Auth, StockController.getStock);
router.get("/api/stock/movements", AuthService.Auth, StockController.getMovements);

(module.exports = router);
