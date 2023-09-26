const { stat } = require("fs");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}; // middleware que susbtitui o error handler padrão do express apenas no development mode

module.exports = {
  errorHandler,
};
