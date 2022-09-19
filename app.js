const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const router = require('./routes');

const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(express.json());
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use(router);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
