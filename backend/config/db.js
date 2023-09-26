const mongoose = require("mongoose"); // chama mongoose

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Conectado ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}; // função async de conectar com database mongo

module.exports = connectDB; // exporta funcção de conexão da db
