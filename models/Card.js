const mongoose = require('mongoose');
const { URL_REGEXP } = require('../utils/constants');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Строка должна содержать как минимум 2 символа'],
    maxlength: [30, 'Строка не должна первышать 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: 'Не правильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
