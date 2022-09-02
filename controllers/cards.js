const Card = require('../models/Card');
const {
  CREATED_CODE,
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/statusCode');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' });
  }
};

const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(CREATED_CODE).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (card) {
      return res.send({ data: card });
    }
    return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    }
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.send({ data: card });
    }
    return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE).send({ message: 'Карточка не найдена' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.send({ data: card });
    }
    return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE).send({ message: 'Карточка не найдена' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
