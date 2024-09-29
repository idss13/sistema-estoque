const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");
const AuthService = require("../services/auth-service");

router.post("/api/auth/register", AuthController.register);
router.post("/api/auth/login", AuthController.login);
router.post("/api/auth/refresh-token", AuthService.Auth, AuthController.refreshToken);

module.exports = router;
