const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getUserById);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(https?):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])$/),
  }),
}), updateUserAvatar);

module.exports = userRoutes;
