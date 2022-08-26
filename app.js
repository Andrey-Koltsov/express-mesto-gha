const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
