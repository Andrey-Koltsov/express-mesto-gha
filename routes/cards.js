const { celebrate, Joi } = require('celebrate');

const express = require('express');
const {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getCardById);

cardRoutes.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), deleteCard);

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(https?):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])$/),
  }),
}), createCard);

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex(),
  }),
}), likeCard);

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex(),
  }),
}), dislikeCard);

module.exports = cardRoutes;
