const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController"); // importando controllers
const { protect } = require("../middleware/authMiddleware"); // chamando o middleware que faz a autenticação ser obrigatória para fazer requests numa rota

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser); // rota protegida pelo middleware

module.exports = router;
