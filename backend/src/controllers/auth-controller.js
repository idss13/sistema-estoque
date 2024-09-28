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
  const user = { name, email, password: hashedPassword, fone };
  try {
    await UserRepository.create(user);
    res
      .status(201)
      .json(new Result(true, "Usuário criado com sucesso", null, null));
  } catch (error) {
    res
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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json(new Result(true, null, { token: token }, null));
};
