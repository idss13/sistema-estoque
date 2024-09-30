const express = require("express");
const router = express.Router();
const MovementController = require("../controllers/movement-controller");
const AuthService = require("../services/auth-service");

router.post("/api/movement", AuthService.Auth, MovementController.create);

module.exports = router;
