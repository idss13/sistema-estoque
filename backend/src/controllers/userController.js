const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const Result = require("../utils/result");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  try {
    const result = await UserService.createUser(user);
    res
      .status(201)
      .json(new Result(true, "Usuário criado com sucesso", result, undefined));
  } catch (error) {
    res
      .status(500)
      .json(new Result(false, "Ops, houve um erro!", undefined, error));
  }
};

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Credenciais inválidas" });
//   }
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// };
