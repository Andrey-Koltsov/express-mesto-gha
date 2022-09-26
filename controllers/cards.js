const Card = require('../models/Card');
const { CREATED_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(CREATED_CODE).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (card) {
      if (card.owner.toString() === req.user._id) {
        const deletedcard = await Card.findByIdAndDelete(req.params.id);
        if (deletedcard) {
          return res.send(deletedcard);
        }
      }
      return next(new ForbiddenError('Нет прав на удаление'));
    }
    return next(new NotFoundError('Карточка не найдена'));
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    return next(new NotFoundError('Карточка не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Карточка не найдена'));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    return next(new NotFoundError('Карточка не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Карточка не найдена'));
    }
    return next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
