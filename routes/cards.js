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
cardRoutes.get('/:id', getCardById);
cardRoutes.delete('/:id', deleteCard);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.put('/:cardId/likes', express.json(), likeCard);
cardRoutes.delete('/:cardId/likes', express.json(), dislikeCard);

module.exports = cardRoutes;
