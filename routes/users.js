const userRoutes = require('express').Router();
const { getUserList, getUserById, createUser } = require('../controllers/users');

userRoutes.get('/', getUserList);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);

module.exports = userRoutes;
