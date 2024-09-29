const jwt = require("jsonwebtoken");
const Result = require("../utils/result");

const Auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtém o token do cabeçalho

  if (!token) {
    return res
      .status(401)
      .json(new Result(false, "Acesso não autorizado", null, null));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json(new Result(false, "Token inválido", null, null));
      } else {
        req.user = decoded; // Armazena os dados do usuário decodificado na requisição
        next();
      }
    });
  }
};

const isAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtém o token do cabeçalho

  if (!token) {
    return res
      .status(401)
      .json(new Result(false, "Acesso não autorizado", null, null));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json(new Result(false, "Token inválido", null, null));
      } else {
        if (decoded.roles.includes("admin")) {
          req.user = decoded; // Armazena os dados do usuário decodificado na requisição
          next();
        } else {
          return res
            .status(403)
            .json(
              new Result(
                false,
                "Acesso negado, o usuário não tem permissão para esta funcionalidade",
                null,
                null
              )
            );
        }
      }
    });
  }
};

module.exports = { Auth, isAdmin };
