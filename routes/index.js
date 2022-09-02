const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { NOT_FOUND_CODE } = require('../utils/statusCode');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

module.exports = router;
