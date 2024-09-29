const express = require("express");
const router = express.Router();
const ExitController = require("../controllers/exit-controller");
const AuthService = require("../services/auth-service");

router.post("/api/exit", AuthService.Auth, ExitController.createExit);

module.exports = router;
