// nos aquivos model definimos nosso scheme
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
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
