const User = require('../models/User');

const getUserList = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).send(user);
};

const createUser = async (req, res) => {
  res.status(200).send('user create');
};

module.exports = { getUserList, getUserById, createUser };
