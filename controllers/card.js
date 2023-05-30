const Card = require('../models/card');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const СredentialError = require('../utils/errors/СredentialError');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданны некорректные данные при создании карточки');
      }
      return next(err);
    });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ card }))
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new ValidationError('Переданны некорректные данные при удалении карточки');
            }
            return next(err);
          });
      } else {
        throw new СredentialError('Недостаточно прав');
      }
    })
    .catch(next);
}

function putLikeCard(req, res, next) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Переданны некорректные данные при добавлении лайка у карточки');
      }
      return next(err);
    });
}

function deleteLikeCard(req, res, next) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Переданны некорректные данные при добавлении лайка у карточки');
      }
      return next(err);
    });
}

module.exports = {
  getCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
};
