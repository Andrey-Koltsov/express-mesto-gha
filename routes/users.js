const express = require('express');
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
userRoutes.patch('/me', updateUser);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = userRoutes;
