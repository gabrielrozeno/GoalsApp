const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel"); // importação do model com schema do goal

// descrição: busca os goals do usuário
// rota: GET /api/goals
// privacidade: privada por autenticação
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find(); // busca o goals por usuário usando schema
  res.status(200).json(goals); // retorna os goals
}); // criando a função async que faz o body do get resquest

// descrição: cria os goals do usuário
// rota: POST /api/goals
// privacidade: privada por autenticação
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Por favor envie um campo de texto na request");
  } // lidando com possiveis erro de request

  const goal = await Goal.create({
    text: req.body.text,
  }); // envia as keys do goal pelo body da request

  res.status(200).json(goal); // reponde com o goal
});

// descrição: atualiza os goals do usuário
// rota: PUT /api/goals/id
// privacidade: privada por autenticação
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id); // busca o goal pelo id que está na url para ver se existe

  if (!goal) {
    res.status(400);
    throw new Error("Goal Não Encontrado, verifique o ID");
  } // se goal não existe, mostra erro

  const upadatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // atualiza o goal em si quando existe

  res.status(200).json(upadatedGoal); // retorna o goal atualizado
});

// descrição: deleta os goals do usuário
// rota: DELETE /api/goals/id
// privacidade: privada por autenticação
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal não encontrado, verifique o ID");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id }); // retorna apenas o id em forma de objeto
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
}; // exportando as funções que fazem os bodys das requests
