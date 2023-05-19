const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/card');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', putLikeCard);

router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
