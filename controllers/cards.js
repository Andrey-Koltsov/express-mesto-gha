const Card = require('../models/Card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка', ...err });
  }
};

const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Карточка не найдена', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    console.log(card);
    if (card) {
      return res.status(200).send({ data: card });
    }
    return res.status(404).send({ message: 'Карточка не найдена' });
  } catch (err) {
    console.log(err.name);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные', ...err });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
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
      return res.status(200).send({ data: card });
    }
    return res.status(404).send({ message: 'Карточка не найдена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Карточка не найдена', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
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
      return res.status(200).send({ data: card });
    }
    return res.status(404).send({ message: 'Карточка не найдена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Карточка не найдена', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
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
