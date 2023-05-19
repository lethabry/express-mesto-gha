const User = require('../models/user');
const { ERROR_SERV, ERROR_VALID, ERROR_NOT_FOUND } = require('../utils/constants');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' }));
}

function getCurrentUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALID).send({ message: 'Передано некорректное значение id пользователя' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при создании пользователя' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при редактировании профиля' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при редактировании аватара' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

module.exports = {
  getUsers, getCurrentUser, createUser, updateProfile, updateAvatar,
};
