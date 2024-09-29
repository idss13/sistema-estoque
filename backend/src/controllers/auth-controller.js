const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user-repository");
const Result = require("../utils/result");
const ValidationContract = require("../utils/validator");

exports.register = async (req, res) => {
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

  const { name, email, password, fone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { name, email, password: hashedPassword, fone, roles: ["user"] };
  try {
    await UserRepository.create(user);
    return res
      .status(201)
      .json(new Result(true, "Usuário criado com sucesso", null, null));
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
