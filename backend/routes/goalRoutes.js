const express = require("express");
const router = express.Router(); // iniciado o router do express
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController"); // chamando as funções do controller que fazem o body das requests

router.get("/", getGoals); // criando uma rota para ser chamada no endpoint do server

router.post("/", setGoals);

router.put("/:id", updateGoals); // rota de atualização com ID especificado como parametro lido na url como put:baseurl:port/api/goals/id

router.delete("/:id", deleteGoals);

// após isso temos todas as rotas do CRUD criadas com seus respectivos controllers importados

module.exports = router; // exportando o router para usar no require
