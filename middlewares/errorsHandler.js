function errorsHandler(err, req, res, next) {
  console.log(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  return next();
}

module.exports = errorsHandler;
