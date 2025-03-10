const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const AuthService = require("../services/auth-service");

router.get("/api/user", AuthService.Auth, UserController.findAll);
router.get("/api/user/:id", AuthService.Auth, UserController.getId);
router.put("/api/user/update/:id", AuthService.Auth, UserController.update);
router.delete("/api/user/:id", AuthService.isAdmin, UserController.delete);

module.exports = router;
