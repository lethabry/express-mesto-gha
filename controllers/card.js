const Card = require('../models/card');
const { ERROR_SERV, ERROR_VALID, ERROR_NOT_FOUND } = require('../utils/constants');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при удалении карточки' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

function putLikeCard(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при добавлении лайка у карточки' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

function deleteLikeCard(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_VALID).send({ message: 'Переданны некорректные данные при удалении лайка у карточки' });
      } else {
        res.status(ERROR_SERV).send({ message: 'Произошла ошибка на сервере' });
      }
    });
}

module.exports = {
  getCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
};
