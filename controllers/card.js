const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданны некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: `${err.name} ${err.message}` });
      }
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
}

function putLikeCard(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
}

function deleteLikeCard(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
}

module.exports = {
  getCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
};
