const jwt = require("jsonwebtoken");
const Result = require("../utils/result");

const AuthService = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtém o token do cabeçalho

  if (!token) {
    return res
      .status(403)
      .json(new Result(false, "Token não fornecido", null, null));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json(new Result(false, "Token inválido", null, null));
    }
    req.userId = decoded.id; // Armazena o ID do usuário decodificado na requisição
    next();
  });
};

module.exports = AuthService;
