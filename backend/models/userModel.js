const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Adicione o nome na chamada"],
    },
    email: {
      type: String,
      required: [true, "Adicione o email na chamada"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Adicione a senha na chamada"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
