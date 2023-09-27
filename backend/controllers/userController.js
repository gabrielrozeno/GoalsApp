const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // importação do model com schema do user
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// descrição: registra o usuário
// rota: POST /api/users
// privacidade: pública
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // desconstruindo usuário e pegando dados pelo body

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Por favor envie todos os campos");
  } // verificando se vem todos os campos

  // checar se usuário existe pelo email
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Usuário já existe");
  } // retornando erro caso user exista

  // encriptar senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); // pega o password como um texto (pela descontrução do obj) e trasnforma em hash

  // criar usuario
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id), //gerando token do usuário e passando id para função
    }); // devolvendo os dados do user depois de criado
  } else {
    res.status(400);
    throw new Error("Erro na criação do usuário");
  } // em caso de erro
});

// descrição: loga o usuário
// rota: POST /api/users/login
// privacidade: pública
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // desconstruindo usuário e pegando dados pelo body

  // checa se o usuário existe pelo email
  const user = await User.findOne({ email });

  // comparando se a senha enviada no body é a mesma que puxou da DB
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Dados do usuário inválidos");
  }
});

// descrição: busca dados do usuário logado
// rota: GET /api/users/me
// privacidade: protegida pelo token
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id); // busca o usuário na db usando id que vem pelo middleware após validar autenticação
  res.status(200).json({
    id: _id,
    name,
    email,
  }); // quando o usuário estiver logado e chamar essa rota, vai receber os dados da conta dele
}); // usando middleware customizado para proteger rota com autenticação

// gerar token jwt que expira em 30 dias
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
