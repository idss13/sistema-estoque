const express = require("express");
const router = express.Router();

const routeDefault = router.get("/", (req, res) => {
  res.status(200).send({
    title: "API - Sistema Controle de Estoque",
    version: "0.0.1",
  });
});

module.exports = routeDefault;
