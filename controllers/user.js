const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
}

function getCurrentUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передано некорректное значение id пользователя' });
      } else {
        res.status(500).send({ message: `${err.name} ${err.message}` });
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданны некорректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: `${err.name} ${err.message}` });
      }
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданны некорректные данные при редактировании профиля' });
      } else {
        res.status(500).send({ message: `${err.name} ${err.message}` });
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданны некорректные данные при редактировании аватара' });
      } else {
        res.status(500).send({ message: `${err.name} ${err.message}` });
      }
    });
}

module.exports = {
  getUsers, getCurrentUser, createUser, updateProfile, updateAvatar,
};
