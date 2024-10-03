const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");
const crypto = require("crypto");
const SendPasswordResetEmail = require("../services/mailer");

exports.register = async (req, res) => {

  const { name, email, password, fone, roles } = req.body;

  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );
  contract.isEmail(req.body.email, "E-mail inválido");
  contract.hasMinLen(
    req.body.password,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { name, email, password: hashedPassword, fone, roles};
  
  try {
    const result = await UserRepository.create(user);
    return res
      .status(201)
      .json(new Result(true, "Usuário criado com sucesso", result, null));
  } catch (error) {
    return res
      .status(400)
      .json(new Result(false, "Falha ao criar o usuário", null, error));
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await UserRepository.getByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json(new Result(false, "Acesso inválido!", null, null));
  }

  const token = {
    id: user._id,
    email: user.email,
    name: user.name,
    roles: user.roles
  };

  const generateToken = jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(201).json(
    new Result(
      true,
      null,
      {
        token: generateToken,
        user: {
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      },
      null
    )
  );
};

exports.refreshToken = async (req, res) => {
  const user = await UserRepository.getByID(req.user.id);

  if (!user) {
    return res
      .status(404)
      .json(new Result(false, "Usuário não encontrado", null, null));
  }

  const token = {
    id: user._id,
    email: user.email,
    name: user.name,
    roles: user.roles
  };

  const generateToken = jwt.sign(token, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(201).json(
    new Result(
      true,
      null,
      {
        token: generateToken,
        user: {
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      },
      null
    )
  );
};

exports.requestPasswordReset = async (req, res) => {

  const email = req.body.email
  
  // Encontre o usuário pelo e-mail
  const user = await UserRepository.getByEmail(email);

  if (!user) {
    return res
      .status(400)
      .json(new Result(true, "Usuário não encontrado", null, null));
  }

  try {
    // Gera um token de recuperação de senha
    const token = crypto.randomBytes(32).toString("hex");

    let expiresToken = new Date(new Date().getTime() + -3 * 60 * 60 * 1000);
    expiresToken.setHours(expiresToken.getHours() + 1);

    const dataToken = {
      passwordResetToken: token,
      passwordResetExpires: expiresToken,
    };

    // Salve o token no banco de dados
    await UserRepository.update(user._id, dataToken);

    // Envie o e-mail
    await SendPasswordResetEmail(user.email, token);

    return res
      .status(200)
      .json(
        new Result(true, "E-mail de recuperação de senha enviado", null, null)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};

exports.resetPassword = async (req, res) => {

  let { token, newPassword } = req.body;

  const user = await UserRepository.getTokenPassword(token);

  if (!user) {
    return res
      .status(400)
      .json(new Result(false, "Token inválido ou expirado", null, null));
  }

  let contract = new ValidationContract();

  contract.hasMinLen(
    newPassword,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    return res.status(400).send(contract.errors()).end();
  }

  newPassword = await bcrypt.hash(req.body.password, 10);

  const updatePassword = {
    password: newPassword,
    passwordResetToken: null,
    passwordResetExpires: null,
  };

  try {
    await UserRepository.update(user._id, updatePassword);
    return res
      .status(200)
      .json(new Result(true, "Senha redefinida com sucesso", null, null));
  } catch (error) {
    return res
      .status(400)
      .json(new Result(false, "Houve falha na requisição", null, error));
  }
};
