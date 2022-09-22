const mongoose = require('mongoose');
const { URL_REGEXP } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Строка должна содержать как минимум 2 символа'],
    maxlength: [30, 'Строка не должна первышать 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Строка должна содержать как минимум 2 символа'],
    maxlength: [30, 'Строка не должна первышать 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: 'Не правильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
