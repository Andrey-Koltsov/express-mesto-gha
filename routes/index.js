const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const BadRequestError = require('../errors/BadRequestError');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res, next) => {
  next(new BadRequestError('Страница не найдена'));
});

module.exports = router;
