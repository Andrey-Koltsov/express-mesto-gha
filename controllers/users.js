const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
  CREATED_CODE,
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/statusCode');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.send(user);
    }
    return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE).send({ message: 'Пользователь не найден' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });
    return res.status(CREATED_CODE).send({ data: user });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
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
        upsert: false,
      },
    );
    if (user) {
      return res.send({ data: user });
    }
    return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    }
    if (err.name === 'CastError') {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
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
        upsert: false,
      },
    );
    if (user) {
      return res.send({ data: user });
    }
    return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    }
    if (err.name === 'CastError') {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
    }
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Неправильный пользователь или пароль' });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Неправильный пользователь или пароль' });
    }
    return res.send(user);
  } catch (err) {
    return res.status(SERVER_ERROR_CODE).send({ message: 'Произошла неизвестная ошибка' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  createUser,
  login,
};
