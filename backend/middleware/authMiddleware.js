// MIDDLEWARE É UM FUNÇÃO QUE RODA ENTRE O CICLO DE REQUEST E RESPONSE
// esse middleware checa o token quando alguém faz uma request em um endpoint protegido
// o header traz o token como: Bearer token, por isso splitamos e transformamos numa array com o bearer na pos 0 e o token na pos 1
// na variavel de token pegamos apenas a pos 1 (token)
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // checa se tem o authorization header e se esse header tem o Bearer no começo
    try {
      // pegando o token do header splitando pelo espaço
      token = req.headers.authorization.split(" ")[1];

      //verifica o token usando a secret do .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // pega o user pelo id usando o token decoded e excluindo o password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Não Autorizado");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Não Autorizado, não há token");
  }
});

module.exports = { protect }; // exportando como objeto
