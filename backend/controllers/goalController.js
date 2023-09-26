const asyncHandler = require("express-async-handler");

// descrição: busca os goals do usuário
// rota: GET /api/goals
// privacidade: privada por autenticação
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Buscar Goals" });
}); // criando a função async que faz o body do get resquest

// descrição: cria os goals do usuário
// rota: POST /api/goals
// privacidade: privada por autenticação
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Por favor envie um campo de texto na request");
  } // lidando com possiveis erro de request
  res.status(200).json({ message: "Criar Goals" });
});

// descrição: atualiza os goals do usuário
// rota: PUT /api/goals/id
// privacidade: privada por autenticação
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Atualizar Goals ${req.params.id}` });
});

// descrição: deleta os goals do usuário
// rota: DELETE /api/goals/id
// privacidade: privada por autenticação
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleta Goals ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
}; // exportando as funções que fazem os bodys das requests
