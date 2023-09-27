// nos aquivos model definimos nosso scheme
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // passando qual user criou o goal
    text: {
      // key do objeto
      type: String, // type do objeto
      required: [true, "Por favor adicione um valor na requisição"],
    },
  },
  {
    timestamps: true, // autoexplicativo kk
  }
);

module.exports = mongoose.model("Goal", goalSchema); // exportação
