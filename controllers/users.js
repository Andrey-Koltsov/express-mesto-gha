const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({ message: 'Пользователь не найден' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Пользователь не найден', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные', ...err });
    }
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Пользователь не найден', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные', ...err });
    }
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Пользователь не найден', ...err });
    }
    return res.status(500).send({ message: 'Произошла неизвестная ошибка', ...err });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
