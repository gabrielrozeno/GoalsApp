const express = require("express");
const router = express.Router(); // iniciado o router do express
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController"); // chamando as funções do controller que fazem o body das requests
const { protect } = require("../middleware/authMiddleware"); // chamando middleware de autenticação para proteger a rota e pegar apenas goals do usuário logado

router.get("/", protect, getGoals); // busca os goals do usuário logado na db

router.post("/", protect, setGoals);

router.put("/:id", protect, updateGoals); // rota de atualização com ID especificado como parametro lido na url como put:baseurl:port/api/goals/id

router.delete("/:id", protect, deleteGoals);

// após isso temos todas as rotas do CRUD criadas e protegidas com seus respectivos controllers importados

module.exports = router; // exportando o router para usar no require
