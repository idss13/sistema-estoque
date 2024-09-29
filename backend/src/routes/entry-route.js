const express = require("express");
const router = express.Router();
const EntryController = require("../controllers/entry-controller");
const AuthService = require("../services/auth-service");

router.post("/api/entry", AuthService.Auth, EntryController.createEntry);

module.exports = router;
