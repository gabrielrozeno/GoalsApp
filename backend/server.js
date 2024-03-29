const exp = require("constants");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("../backend/middleware/errorMiddleware"); // importa error handler custom
const connectDB = require("./config/db"); // importa conexao da db
const port = process.env.PORT; // chamando variável porta do arquivo .env

connectDB(); // chama funcao de conectar na db

const app = express(); // inicializando express

app.use(express.json()); // middleware para aceitar json nos bodys das requests
app.use(express.urlencoded({ extended: false })); // middleware para aceitar url encoded json

app.use("/api/goals", require("./routes/goalRoutes")); // criando endpoint especifico e passando o arquivo com as rotas e seus controllers
app.use("/api/users", require("./routes/userRoutes")); // criando endpoint especifico e passando o arquivo com as rotas e seus controllers

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor Iniciado na Porta ${port}`);
}); // criando o listener com porta e função
